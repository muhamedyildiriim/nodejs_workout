/**
 * Topic: Error Handling → JS Errors → AssertionError
 * Purpose: Demonstrates how AssertionError is thrown when an expected condition fails during tests or runtime checks.
 * Key Points:
 *  - Thrown by the assert module when an assertion evaluates to false
 *  - Commonly used in testing or sanity checks during development
 *  - Helps ensure critical assumptions remain true
 * Run: node src/03-error-handlings/01-core-concepts/assertion-error.js   
 * (Node >= 20)
 * Expected:
 *  - Logs: "Assertion Error: Matematik yanlış!"
 */

import assert from "assert";

try {
  // Assertion fails because 2 + 2 ≠ 5
  assert.strictEqual(2 + 2, 5, "Matematik yanlış!");
} catch (err) {
  console.log("Assertion Error:", err.message);
}

// Notes:
// - AssertionError is used for logic verification, not user-facing validation.
// - In production code, handle recoverable logic separately from assertions.
// - Helps catch internal bugs early during testing or runtime verification.