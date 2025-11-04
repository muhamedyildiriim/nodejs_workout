/**
 * Topic: Authentication → jsonwebtoken → Verifying a Token
 * Purpose: Demonstrates how to verify a token, simulating a protected route middleware.
 * Key Points:
 * - `jwt.verify()` is the function to check a token's validity.
 * - It requires the token itself and the *exact same* secret key.
 * - If valid: It returns the decoded payload (the original data).
 * - If invalid (bad signature, expired): It throws an error.
 * Run:
 * 1. Run `01-jwt-sign.js` first to get a valid token.
 * 2. Paste the token into the `TOKEN_TO_VERIFY` variable below.
 * 3. node src/07-build-api/03-auth/01-jsonwebtoken/02-jwt-verify.js
 * Expected:
 * - "Token is valid!"
 * - Logs the decoded payload (e.g., { id: '12345abc', ... })
 */

import "dotenv/config";
import jwt from "jsonwebtoken";

// --- PASTE THE TOKEN FROM THE PREVIOUS SCRIPT HERE ---
const TOKEN_TO_VERIFY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1YWJjIiwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3OTc1NjIwNywiZXhwIjoxNjc5NzU5ODA3fQ.FAKE_SIGNATURE_PART";
// ---

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in your .env file.");
}

// This function simulates a "middleware" that protects a route.
const verifyToken = (token) => {
  try {
    // 3. Verify the token
    const decodedPayload = jwt.verify(token, JWT_SECRET);

    console.log("Token is valid!");
    console.log("Decoded Payload:", decodedPayload);
    // In a real app, you would now attach `decodedPayload` to the `request` object.
    // e.g., req.user = decodedPayload;
  } catch (error) {
    // The 'catch' block handles all verification errors
    console.error("Token verification failed:", error.message);
  }
};

verifyToken(TOKEN_TO_VERIFY);

/*
Notes:
- This `try...catch` block is the core of all authentication middleware.
- If the token is expired, `error.message` will be "jwt expired".
- If the signature is invalid, it will be "invalid signature".
- This process is "stateless" - we did not need to check a database.
*/