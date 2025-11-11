/**
 * File: /03-api-architectures/02-authentication/03-passport-local.js
 * Topic: API Architectures → Authentication → "Stateful" Architecture
 * Purpose: Demonstrates the "Classic", "Stateful" using `passport-local` and `express-session`.
 *
 * "The Architecture":
 * 1. User `/login` -> `passport-local` Strategy runs.
 * 2. `bcrypt.compare()` checks password.
 * 3. `passport.serializeUser` saves *only* the `user.id` into the "Session Memory".
 * 4. `express-session` *sends* a cookie to the client (Browser/Postman).
 * 5. Client requests `/profile` -> *sends back* the cookie.
 * 6. `passport.deserializeUser` reads the `id` from the cookie,
 * fetches the *full user* from the DB, and attaches it to `req.user`.
 * 7. `req.isAuthenticated()` returns `true`.
 *
 * "The Trade-Off":
 * - **Pro:** Simple for the client.
 * - **Con:** **"The Netflix Problem"**. This is *not* "scalable".
 * The "Session Memory" is *inside* this one server's RAM.
 * If you have 10,000 servers, the user's cookie is only
 * valid on the *one server* they logged into. (The solution is `Redis`).
 *
 * Install: npm install express express-session passport passport-local bcryptjs
 * Run: node src/03-api-architectures/02-authentication/03-passport-local.js
 * Test (Use Postman):
 * 1. POST to `http://localhost:3000/login`
 * (Body: `x-www-form-urlencoded`, `username`="test@user.com", `password`="my-secret-password-123")
 * 2. GET `http://localhost:3000/profile`
 * (Postman *automatically* sends the cookie back. It should work.)
 * 3. GET `http://localhost:3000/logout`
 * 4. GET `http://localhost:3000/profile` (It should now fail with 401)
 */

import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import bcrypt from "bcryptjs";

// --- 1. Mock Database & Tool Setup ---
// (This hash is for "correct-password" with 10 rounds)
const MOCK_USER = {
  id: "u-123",
  email: "test@user.com",
  passwordHash: "$2b$10$u1lHqlrGMlPY0v7tKNDC7eJwbJQt3yc/u8XxFLcmRB3rLmY0q5vSS",
};
const findUserByEmail = async (email) =>
  email === MOCK_USER.email ? MOCK_USER : null;
const findUserById = async (id) => (id === MOCK_USER.id ? MOCK_USER : null);

// --- 2. Setup Express & "The Memory" (`express-session`) ---
const app = express();
app.use(express.urlencoded({ extended: false })); // For <form> POSTs
app.use(
  session({
    secret: "my-stateful-session-secret", // Must be in `process.env`
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false }, // `secure: true` in production (HTTPS)
  })
);

// --- 3. Setup "The Alarm System" (Passport) ---
app.use(passport.initialize());
app.use(passport.session()); // Connects Passport to "The Memory"

// --- 4. Define "The Engine" (`passport-local` Strategy) ---
passport.use(
  new LocalStrategy(
    { usernameField: "username" }, // We'll use "username" from the form
    async (username, password, done) => {
      try {
        const user = await findUserByEmail(username);
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        // Use the "bcrypt" tool
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }
        // Success!
        return done(null, user); // `user` is passed to `serializeUser`
      } catch (error) {
        return done(error);
      }
    }
  )
);

// --- 5. Memory Management ---
// Saves the ID to the session memory
passport.serializeUser((user, done) => {
  done(null, user.id); // Save *only* the ID
});

// Reads the ID from memory and fetches the user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    done(null, user); // Attaches the *full user* to `req.user`
  } catch (err) {
    done(err);
  }
});
// ----------------------------------------------------

// --- 6. The Routes ---
app.post(
  "/login",
  passport.authenticate("local"), // This *runs* "The Engine"
  (req, res) => {
    // If successful, `serializeUser` has run and the cookie is set.
    res.status(200).json({ message: "Login successful!", user: req.user });
  }
);

// The "Gatekeeper" middleware
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { // This checks "The Memory"
    return next();
  }
  res.status(401).json({ error: "You are not authorized." });
};

app.get("/profile", isAuthenticated, (req, res) => {
  // `deserializeUser` has already run, so `req.user` is ready.
  res.json({ message: "This is a protected profile.", user: req.user });
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => { // Destroys the cookie
    if (err) {
      return next(err);
    }
    res.status(200).send("Logout successful.");
  });
});

// --- 7. Start Server ---
app.listen(3000, () => {
  console.log("STATEFUL (Session) server running on http://localhost:3000");
});