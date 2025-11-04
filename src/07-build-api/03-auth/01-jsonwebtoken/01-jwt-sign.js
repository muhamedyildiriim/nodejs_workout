/**
 * Topic: Authentication → jsonwebtoken → Creating (Signing) a Token
 * Purpose: Demonstrates how to create a new JWT after a user successfully logs in.
 * Key Points:
 * - `jwt.sign()` is the function to create a token.
 * - Payload: The data you want to store in the token (e.g., user ID).
 * NEVER put sensitive data (like passwords) in the payload.
 * - Secret Key: The "password" used to create the signature. Must be kept secret.
 * We load it from `process.env` (via 'dotenv').
 * - Options: `expiresIn` is critical for security. It sets the token's lifetime.
 * Run:
 * 1. npm install jsonwebtoken dotenv
 * 2. Add JWT_SECRET="your-secret-key" to your .env file in the root.
 * 3. node src/07-build-api/03-auth/01-jsonwebtoken/01-jwt-sign.js
 * Expected:
 * - Logs a long, encoded JWT string (e.g., "eyJhbGciOiJIUzI1Ni...")
 */

import "dotenv/config"; // Load .env variables first
import jwt from "jsonwebtoken";

// 1. The data to encode in the token (NON-sensitive data)
const userPayload = {
  id: "12345abc",
  username: "testuser",
  role: "admin",
};

// 2. The secret key (loaded from environment variables)
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in your .env file.");
}

const createToken = () => {
  try {
    // 3. Create (sign) the token
    const token = jwt.sign(
      userPayload, // The data to include (payload)
      JWT_SECRET, // The secret key to sign it with
      {
        expiresIn: "1h", // Token lifetime (e.g., 1 hour, "15m", "7d")
      }
    );

    console.log("Generated JWT:", token);
    return token;
  } catch (error) {
    console.error("Error signing token:", error.message);
  }
};

createToken();

/*
Notes:
- The generated token consists of three parts separated by dots:
  [Header].[Payload].[Signature]
- The Header and Payload are Base64Url encoded (NOT encrypted).
  Anyone can decode them. The Signature is what provides the security.
*/