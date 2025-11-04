/**
 * Topic: Authentication → bcryptjs → Comparing a Password
 * Purpose: Demonstrates how to check if a login password matches a stored hash.
 * Key Points:
 * - We NEVER "de-hash" the stored password.
 * - `bcrypt.compare()`: Takes the plain-text login attempt and the
 * stored hash.
 * - It magically extracts the salt from the stored hash and re-hashes
 * the login password to see if it produces an identical match.
 * - This function is also slow (async) by design.
 * Run:
 * 1. Run `01-hash-password.js` and copy the "Hashed Password" string.
 * 2. Paste the hash into the `STORED_HASH_FROM_DB` variable below.
 * 3. node src/07-build-api/03-auth/02-bcrypt/02-compare-password.js
 * Expected:
 * - Logs "Login attempt: my-secret-password-123" -> "Result: true (Login Successful)"
 * - Logs "Login attempt: wrong-password" -> "Result: false (Invalid Credentials)"
 */

import bcrypt from "bcryptjs";

// --- PASTE THE HASH FROM THE PREVIOUS SCRIPT HERE ---
const STORED_HASH_FROM_DB =
  "$2a$10$N9qo8uLOickgx2ZMRZoMye.jOaR1fYJc.QnS.L5d.dY.EAwZ.b11O";
// ---

const checkPassword = async (loginPassword, storedHash) => {
  try {
    console.log(`\nChecking login attempt: "${loginPassword}"`);
    // 1. Compare the plain-text password with the stored hash
    const isMatch = await bcrypt.compare(loginPassword, storedHash);

    console.log("Result:", isMatch ? "true (Login Successful)" : "false (Invalid Credentials)");
    return isMatch;
  } catch (error) {
    console.error("Error comparing password:", error.message);
  }
};

const runLoginChecks = async () => {
  // Correct password
  await checkPassword("my-secret-password-123", STORED_HASH_FROM_DB);

  // Incorrect password
  await checkPassword("wrong-password", STORED_HASH_FROM_DB);
};

runLoginChecks();

/*
Notes:
- `bcrypt.compare()` is the core of your "Login" logic.
- You never "un-hash" anything. You only hash the new attempt and compare.
- This function is secure against "timing attacks".
*/