/**
 * File: /03-api-architectures/02-authentication/01-bcrypt.js
 * Topic: API Architectures → Authentication → `bcrypt` (The "Safe")
 * Purpose: Demonstrates the *critical* and *non-negotiable* tool for securely hashing and comparing passwords.
 *
 * Key Points:
 * - **The "Sin":** Storing plain-text passwords.
 * - **The Solution:** Hashing.
 * - `bcrypt.hash(password, saltRounds)`: Used *once* during **Registration** (`/register`) to create a secure, salted hash.
 * - `bcrypt.compare(password, hash)`: Used *every time* during **Login** (`/login`) to securely check if the attempt matches the stored hash.
 * - These functions are *designed* to be **slow** and **async** to defeat "brute-force" attacks.
 *
 * Install: npm install bcryptjs
 * Run: node src/03-api-architectures/02-authentication/01-bcrypt.js
 * Expected:
 * - Logs the "Hashed Password" (e.g., "$2a$10$...")
 * - Logs "Login Check (Correct): true"
 * - Logs "Login Check (Wrong): false"
 */

import bcrypt from "bcryptjs";

const plainTextPassword = "my-secret-password-123";

async function runBcryptDemo() {
  console.log("--- Starting `bcrypt` Demo ---");

  // --- 1. Registration (`/register`) Flow ---
  // (This happens *once* when the user signs up)
  console.log("Hashing the password...");
  const saltRounds = 10; // Standard "cost" (maliyet)
  const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

  console.log("Plain Password:", plainTextPassword);
  console.log("Hashed Password (Store this in DB):", hashedPassword);

  // --- 2. Login (`/login`) Flow ---
  // (This happens *every time* the user tries to log in)

  // A. Correct password attempt
  const isCorrect = await bcrypt.compare(plainTextPassword, hashedPassword);
  console.log(`\nLogin Check (Correct: "${plainTextPassword}"):`, isCorrect); // true

  // B. Wrong password attempt
  const isWrong = await bcrypt.compare("wrong-password", hashedPassword);
  console.log(`Login Check (Wrong: "wrong-password"):`, isWrong); // false
}

runBcryptDemo();

// Notes:
// - `bcrypt` automatically handles the "salt" generation and stores it *inside* the hash string. You only need to store the hash.
// - Never use the `sync` versions (e.g., `bcrypt.hashSync`) in a server, as it *blocks the Event Loop* (the "Sin").