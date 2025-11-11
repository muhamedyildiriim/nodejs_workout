/**
 * File: /03-api-architectures/02-authentication/04-passport-jwt.js
 * Topic: API Architectures → Authentication → "Stateless" Architecture
 * Purpose: Demonstrates the "Modern" (Modern), "Stateless" architecture using `passport-jwt`.
 * **This is the "America's level" (Amerika seviyesi) standard for APIs.**
 *
 * "The Architecture":
 * 1. Client `/login` -> `bcrypt.compare()` checks password.
 * 2. `jwt.sign()` *creates* a token.
 * 3. Server *sends* the token back to the client (JSON).
 * 4. **Server *forgets* everything.** (No Memory, no `express-session`).
 * 5. Client requests `/profile` -> *manually attaches* the token to the `Authorization: Bearer <token>` header.
 * 6. `passport-jwt` "Strategy" *extracts* the token from the header.
 * 7. It *verifies* the token using `jwt.verify()` and the `JWT_SECRET`.
 * 8. If valid, it fetches the user and attaches it to `req.user`.
 *
 * "The Trade-Off":
 * - **Pro:** **Infinitely "Scalable"**. Solves problem. Any of the 10,000 servers can verify token as long as they know the `JWT_SECRET`.
 * - **Con:** Client must *manage* the token (e.g., in `localStorage` or `secure storage`).
 *
 * Install: npm install express passport passport-jwt jsonwebtoken bcryptjs dotenv
 * Run: node src/03-api-architectures/02-authentication/04-passport-jwt.js
 * Test (Use Postman):
 * 1. POST to `http://localhost:3000/login`
 * (Body: `JSON`, `{"email": "test@user.com", "password": "correct-password"}`)
 * 2. **Copy** the `token` string from the JSON response.
 * 3. GET `http://localhost:3000/profile`
 * 4. Go to the "Authorization" tab, select "Bearer Token".
 * 5. **Paste** the `token` into the "Token" field.
 * 6. Send. (It should work.)
 */

import express from "express";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config"; // To load JWT_SECRET

// --- 1. Mock Database & Tool Setup ---
const MOCK_USER = {
  id: "u-123",
  email: "test@user.com",
  passwordHash: "$2b$10$u1lHqlrGMlPY0v7tKNDC7eJwbJQt3yc/u8XxFLcmRB3rLmY0q5vSS",
};
const findUserByEmail = async (email) =>
  email === MOCK_USER.email ? MOCK_USER : null;
const findUserById = async (id) => (id === MOCK_USER.id ? MOCK_USER : null);

// --- 2. Load "The Secret" ---
const JWT_SECRET = process.env.JWT_SECRET || "a-fallback-secret-if-dotenv-fails";
if (JWT_SECRET === "a-fallback-secret-if-dotenv-fails") {
  console.warn("WARNING: JWT_SECRET not set in .env file. Using fallback.");
}

// --- 3. Setup Express (NO Memory / `express-session`!) ---
const app = express();
app.use(express.json()); // For JSON POSTs
app.use(passport.initialize()); // Initialize Passport (NO `passport.session()`)
// ----------------------------------------------------

// --- 4. Define "The Engine" (`passport-jwt` Strategy) ---
const jwtOptions = {
  // 1. "The Eye": Where to look for the Token
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // 2. "The Key": The "Secret" to verify the token
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    // This function runs *after* `jwt.verify()` is successful.
    // `jwt_payload` is the data we put inside the token (e.g., { id: ... })
    try {
      // We check if the user *still exists* in our database
      const user = await findUserById(jwt_payload.id);
      if (user) {
        return done(null, user); // Attaches the *full user* to `req.user`
      } else {
        return done(null, false); // No user found
      }
    } catch (err) {
      return done(err, false);
    }
  })
);
// ----------------------------------------------------

// --- 5. The Routes (Kapılar) ---

// The "UNPROTECTED" Login Route
// This route's *only job* is to *create* the token.
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // --- Token creation ---
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    // Send the token to the client.
    // The client must now store this.
    res.json({ message: "Login successful!", token: token });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// The "PROTECTED" Route
app.get(
  "/profile",
  // This is the "Gatekeeper"
  // It *runs* "The Engine" (JwtStrategy)
  // **CRITICAL:** `{ session: false }` tells Passport:
  // "DO NOT use memory / cookies. This is 'Stateless'."
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // If we get here, the token was valid.
    // `passport-jwt`'s `done()` (from Step 4) has put the user on `req.user`.
    res.json({
      message: "This is a protected profile.",
      user: req.user,
    });
  }
);

// --- 6. Start Server ---
app.listen(3000, () => {
  console.log("STATELESS (JWT) server running on http://localhost:3000");
});