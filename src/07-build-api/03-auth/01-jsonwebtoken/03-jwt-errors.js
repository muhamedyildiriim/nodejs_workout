/**
 * Topic: Authentication → jsonwebtoken → Handling Verification Errors
 * Purpose: Demonstrates the specific errors 'jwt.verify()' can throw.
 * Key Points:
 * - 'JsonWebTokenError': General error (e.g., invalid signature, malformed token).
 * - 'TokenExpiredError': Specific error when the token's 'exp' time has passed.
 * - We can check `error.name` to provide specific feedback.
 * Run:
 * 1. Use an *expired* token or a *tampered* token in the variables below.
 * 2. node src/07-build-api/03-auth/01-jsonwebtoken/03-jwt-errors.js
 * Expected:
 * - "Token verification failed:"
 * - Logs the specific error (e.g., "jwt expired" or "invalid signature")
 */

import "dotenv/config";
import jwt from "jsonwebtoken";
import pkg from 'jsonwebtoken';
const { JsonWebTokenError, TokenExpiredError } = pkg;

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in your .env file.");
}

// 1. An EXPIRED Token (This was set to expire in 2023)
const EXPIRED_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTY3OTc1OTg1NiwiZXhwIjoxNjc5NzU5ODg2fQ.6-a-vE8YdY6S2-vL4-FAKE-TOKEN";

// 2. A TAMPERED Token (The signature doesn't match the payload)
const TAMPERED_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTY3OTc1OTg1Nn0.THIS_IS_A_FAKE_SIGNATURE";

// 3. A token signed with a DIFFERENT secret
const WRONG_SECRET_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1YWJjIiwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwOTY0MzAwMiwiZXhwIjoxNzA5NjQ2NjAyfQ.aDifferentSignature";

const checkToken = (token, description) => {
  console.log(`\n--- Checking ${description} ---`);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Result: VALID", decoded);
  } catch (error) {
    console.error("Result: INVALID");

    // This is how you differentiate errors in production code
    if (error instanceof TokenExpiredError) {
      console.error("Error Type: Token Expired", { name: error.name, message: error.message });
    } else if (error instanceof JsonWebTokenError) {
      console.error("Error Type: Token Invalid", { name: error.name, message: error.message });
    } else {
      console.error("Error Type: Unknown", error.message);
    }
  }
};

checkToken(EXPIRED_TOKEN, "Expired Token");
checkToken(TAMPERED_TOKEN, "Tampered Token (Bad Signature)");
checkToken(WRONG_SECRET_TOKEN, "Token with Wrong Secret");

/*
Notes:
- In a real API, you would check `error.name` to send a specific 401
  or 403 status code back to the client.
- e.g., if (error.name === 'TokenExpiredError'), return res.status(401).send('Token expired');
- This demonstrates robust, production-ready error handling.
*/