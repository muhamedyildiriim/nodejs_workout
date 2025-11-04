/**
 * Topic: Authentication → Passport.js → Local Strategy (Email/Password)
 * Purpose: Demonstrates a full, working server using Passport.js with the
 * 'local' (email/password) strategy.
 * Key Points:
 * 1. This is a complete Express server.
 * 2. `express-session` is used by Passport to create a persistent session (cookie).
 * 3. `passport-local` is the "Strategy" that handles the username/password check.
 * 4. We use `bcrypt.compare` (from our last lesson) *inside* the strategy.
 * 5. `serializeUser` / `deserializeUser` are critical for managing session data.
 *
 * How to Test:
 * 1. Run the server: `node src/07-build-api/03-auth/03-passport-local/01-local-strategy-server.js`
 * 2. Use Postman or curl to test the routes:
 * - POST to `http://localhost:3000/login` with x-www-form-urlencoded body:
 * `username=test@user.com` & `password=correct-password` (Should log in)
 * - POST to `http://localhost:3000/login` with:
 * `username=test@user.com` & `password=wrong-password` (Should fail)
 * - GET `http://localhost:3000/profile` (Should show user data if logged in)
 * - GET `http://localhost:3000/logout` (Should log out)
 */

import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import bcrypt from "bcryptjs";

// --- 1. MOCK DATABASE (Simulating user data) ---
// In a real app, this hash would come from your '01-hash-password.js' script.
const MOCK_USER = {
  id: "123-abc",
  email: "test@user.com",
  username: "testuser",
  // Hashed version of "correct-password"
  passwordHash: "$2b$10$g8zevRxBfxHiAMn.wP4JFOvQF40FIhAki0T70qmeZmRYc1wG72PwC",
};
// We pre-hash "correct-password" for this example.
// (async () => {
//   const hash = await bcrypt.hash("correct-password", 10);
//   console.log("Mock user hash:", hash);
// })();

// --- 2. SETUP EXPRESS & MIDDLEWARE ---
const app = express();
app.use(express.json());
// Middleware to parse form data (which is how logins are usually sent)
app.use(express.urlencoded({ extended: false }));

// Session middleware: Passport *requires* this to store the user.
app.use(
  session({
    secret: "a-very-secret-key-for-sessions", // Change this!
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // In production, this should be true (HTTPS)
  })
);

// Passport middleware: Initialize Passport and connect it to the session.
app.use(passport.initialize());
app.use(passport.session());

// --- 3. CONFIGURE PASSPORT STRATEGY (The "Machine") ---
// This is the "Local Strategy" (Email/Password)
passport.use(
  new LocalStrategy(
    { usernameField: "username" }, // We are using 'username' (which is our email)
    async (username, password, done) => {
      // This function is the core of our login logic.
      try {
        // 1. Find the user in the database (we use our mock user)
        if (MOCK_USER.email !== username) {
          return done(null, false, { message: "Incorrect username." });
        }

        // 2. Compare the password (using the "tool" we learned!)
        const isMatch = await bcrypt.compare(password, MOCK_USER.passwordHash);

        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        // 3. Success! Pass the user object to Passport.
        return done(null, MOCK_USER);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// --- 4. PASSPORT SESSION MANAGEMENT ---
// This tells Passport *what* to save in the session (cookie).
// We only save the user ID to keep the cookie small.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// This tells Passport *how* to get the full user object back
// from the ID we saved in the session.
passport.deserializeUser((id, done) => {
  // In a real app, you would find the user by ID in the database.
  if (id === MOCK_USER.id) {
    done(null, MOCK_USER);
  } else {
    done(new Error("User not found"));
  }
});

// --- 5. DEFINE ROUTES ---

// The Login Route:
// Passport.authenticate('local') *automatically* runs the strategy we defined.
app.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    // We don't redirect on success, we just send a success message.
    // Or, we could redirect: successRedirect: "/profile",
  }),
  (req, res) => {
    // If passport.authenticate() passes, this function runs.
    console.log("Login successful, user is in req.user");
    res.status(200).json({
      message: "Login successful!",
      user: req.user, // req.user is added by Passport!
    });
  }
);

app.get("/login-failure", (req, res) => {
  res.status(401).send("Login Failed. (Check console for strategy message)");
});

// A Protected Route:
// We add a custom middleware to check if the user is logged in.
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { // req.isAuthenticated() is added by Passport!
    return next();
  }
  res.status(401).send("You are not authorized. Please log in.");
};

app.get("/profile", isAuthenticated, (req, res) => {
  // Thanks to deserializeUser, req.user is the full user object.
  res.json({
    message: "This is a protected profile page.",
    user: req.user,
  });
});

// The Logout Route:
app.get("/logout", (req, res, next) => {
  req.logout((err) => { // req.logout() is added by Passport!
    if (err) {
      return next(err);
    }
    res.send("Logout successful!");
  });
});

// --- 6. START THE SERVER ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});