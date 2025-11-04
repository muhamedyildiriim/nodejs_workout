/**
 * Topic: Authentication → Passport.js → JWT Strategy (Stateless)
 * Purpose: Demonstrates a "Stateless" server using Passport.js with the
 * 'jwt' strategy. This is the most common pattern for modern APIs.
 * Key Points:
 * 1. This server is "Stateless" - it does NOT use `express-session` or cookies.
 * 2. The `/login` route *creates and returns* a JWT (string).
 * 3. The client is responsible for storing this token and sending it back.
 * 4. `passport-jwt` strategy *extracts* the token from the `Authorization` header.
 * 5. `passport.authenticate()` is told `{ session: false }` to enforce statelessness.
 *
 * How to Test:
 * 1. Run the server: `node src/07-build-api/03-auth/04-passport-jwt/01-jwt-strategy-server.js`
 * 2. Use Postman (Step A):
 * - POST to `http://localhost:3000/login` with JSON body:
 * `{ "email": "test@user.com", "password": "correct-password" }`
 * - The server will return a JSON object with a `token` (e.g., "eyJhbGci...").
 * - **Copy this entire token string.**
 * 3. Use Postman (Step B):
 * - Create a new request: GET `http://localhost:3000/profile`
 * - Go to the **"Authorization"** tab (or "Auth" tab).
 * - Select Type: **"Bearer Token"**.
 * - In the "Token" box, **paste the token** you copied from Step A.
 * - Send the request. You should see your profile data.
 * 4. Try Step B *without* the "Authorization" header. You will get a 401 "Unauthorized".
 */

import "dotenv/config";
import express from "express";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";

// --- 1. MOCK DATABASE (Simulating user data) ---
const MOCK_USER = {
  id: "123-abc",
  email: "test@user.com",
  username: "testuser",
  // In a real app, this hash would be checked by bcrypt on the /login route
  // passwordHash: "$2a$10$f.P.Y.s.e.c.u.r.e.H.a.s.h.v/vW9.zF6i.e.1v8O9P3"
};

// --- 2. CONFIGURATION (Loading the "Secret") ---
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in your .env file.");
}

// --- 3. SETUP EXPRESS & PASSPORT (NO SESSION!) ---
const app = express();
app.use(express.json());

// Initialize Passport (NO `app.use(passport.session())`!)
app.use(passport.initialize());

// --- 4. CONFIGURE PASSPORT JWT STRATEGY (The "Stateless Machine") ---

// Configure the options for the JWT Strategy
const jwtOptions = {
  // This tells Passport to extract the token from the "Authorization: Bearer <token>" header
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // This tells Passport which secret to use to verify the token's signature
  secretOrKey: JWT_SECRET,
};

// This is the "Gatekeeper"
passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    // This function runs *after* passport-jwt has successfully verified the token signature.
    // `jwt_payload` is the decoded data (e.g., { id: '123-abc', ... })
    try {
      console.log("JWT Payload received:", jwt_payload);

      // We find the "fresh" user in our database from the payload's ID.
      if (MOCK_USER.id === jwt_payload.id) {
        // Success! Pass the user object to Passport.
        return done(null, MOCK_USER);
      } else {
        // User not found.
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

// --- 5. DEFINE ROUTES ---

// The Login Route (UNPROTECTED)
// This route *creates* the token.
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // In a real app, you would use bcrypt.compare(password, user.passwordHash)
  // We simulate a successful login here:
  if (email === MOCK_USER.email && password === "correct-password") {
    // 1. Create the payload
    const payload = {
      id: MOCK_USER.id,
      email: MOCK_USER.email,
    };

    // 2. Sign the token
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1h",
      // audience: 'my-app.com', // Good practice to set
      // issuer: 'api.my-app.com', // Good practice to set
    });

    // 3. Return the token to the client
    res.json({
      message: "Login successful!",
      token: token, // The client must now store this
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// The Protected Route (MUST send token)
app.get(
  "/profile",
  // This is our "Gatekeeper".
  // `passport.authenticate` uses the JWT Strategy we defined.
  // `{ session: false }` is CRITICAL to tell Passport not to use cookies.
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // If the code reaches here, the token was valid.
    // `passport-jwt`'s strategy has put the user object into `req.user`.
    res.json({
      message: "This is a protected profile page.",
      user: req.user,
    });
  }
);

// --- 6. START THE SERVER ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});