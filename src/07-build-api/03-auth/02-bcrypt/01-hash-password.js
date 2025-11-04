/**
 * Topic: Authentication → bcryptjs → Hashing a Password
 * Purpose: Demonstrates how to securely hash a password before saving it to a database.
 * Key Points:
 * - We NEVER store plain-text passwords.
 * - `bcrypt.genSalt()`: Generates a "salt" (random data) to ensure two
 * identical passwords result in different hashes.
 * - `bcrypt.hash()`: Securely hashes the password with the salt.
 * - "Salt Rounds" (e.g., 10): Controls how complex (and slow) the hash
 * creation is. Higher is more secure but slower. 10-12 is the standard.
 * Run:
 * 1. npm install bcryptjs
 * 2. node src/07-build-api/03-auth/02-bcrypt/01-hash-password.js
 * Expected:
 * - Logs a long, complex hash string (e.g., "$2a$10$...")
 */

import bcrypt from "bcryptjs";

const plainTextPassword = "my-secret-password-123";

const hashPassword = async (password) => {
  try {
    // 1. Generate a "Salt"
    // 10 "rounds" is the standard.
    const salt = await bcrypt.genSalt(10);
    console.log("Generated Salt:", salt);

    // 2. Hash the password using the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("Plain Password:", password);
    console.log("Hashed Password:", hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error.message);
  }
};

hashPassword(plainTextPassword);

/*
Notes:
- This is an ASYNCHRONOUS operation. It's designed to be slow
  to protect against brute-force attacks.
- Never use the 'sync' versions (e.g., bcrypt.hashSync) in a server's
  main thread, as it will block the event loop.
- The salt is included as part of the final hash string. You only
  need to store the final hash in your database.
*/