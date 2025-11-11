/**
 * File: /03-api-architectures/02-authentication/02-jsonwebtoken.js
 * Topic: API Architectures → Authentication → `jsonwebtoken` (The "Key")
 * Purpose: Demonstrates the tool for creating and verifying JSON Web Tokens (JWTs), the "key" for "Stateless" APIs.
 *
 * Key Points:
 * - `jwt.sign(payload, secret, options)`: Used *once* during **Login** (`/login`) to create a "Stateless" token.
 * - `jwt.verify(token, secret)`: Used *on every protected request* (e.g., `/profile`) to verify the token.
 * - **Payload:** The data *inside* the token (e.g., `userId`).
 * It is **NOT encrypted**, only Base64 encoded. Never put secrets here.
 * - **Secret:** The "password" to *sign* the token. This **MUST** be in `process.env`.
 *
 * Install: npm install jsonwebtoken
 * Run: node src/03-api-architectures/02-authentication/02-jsonwebtoken.js
 * Expected:
 * - Logs a "Generated JWT" (e.g., "eyJhbGciOi...")
 * - Logs "Verification Success!" and the decoded payload.
 * - Logs "Verification Failed: jwt expired" (for the expired token).
 */

import jwt from "jsonwebtoken";

// --- The secret safe ---
// (In a real app, this comes from `process.env.JWT_SECRET`)
const JWT_SECRET = "my-super-secret-key-that-no-one-knows-123";
// ---------------------------------------------------

// The data to put *inside* the token (must NOT be sensitive)
const userPayload = {
  id: "u-12345",
  username: "test@user.com",
  role: "admin",
};

async function runJwtDemo() {
  console.log("--- Starting `jsonwebtoken` Demo ---");

  // --- 1. Login (`/login`) Flow: Signing the Token ---
  console.log("1. Signing Token (at Login)...");
  const token = jwt.sign(
    userPayload, // The data
    JWT_SECRET, // The secret
    { expiresIn: "15m" } // "Expires in 15 minutes"
  );
  console.log("Generated JWT:", token);

  // --- 2. Protected Route (`/profile`) Flow: Verifying the Token ---
  console.log("\n2. Verifying Token (on /profile request)...");
  try {
    const decodedPayload = jwt.verify(token, JWT_SECRET);
    console.log("Verification Success!");
    console.log("Decoded Payload:", decodedPayload);
  } catch (err) {
    console.error("Verification Failed:", err.message);
  }

  // --- 3. Error Handling Flow: Expired Token ---
  console.log("\n3. Verifying an *Expired* Token...");
  // This token was signed with `expiresIn: '1s'` and is now expired.
  const expiredToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUtMTIzNDUiLCJ1c2VybmFtZSI6InRlc3RAdXNlci5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzExOTUzMDUsImV4cCI6MTczMTE5NTMwNn0.FAKE-SIGNATURE";
  try {
    jwt.verify(expiredToken, JWT_SECRET);
  } catch (err) {
    // This is the *expected* error.
    console.log(`Verification Failed (as expected): ${err.message}`); // "jwt expired"
  }
}

runJwtDemo();

// Notes:
// - This is the difference-making concept that enables "Stateless" architecture (the "Netflix/Uber" model).