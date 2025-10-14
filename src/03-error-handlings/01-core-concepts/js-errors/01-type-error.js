/**
 * Topic: Error Handling → JS Errors → TypeError
 * Purpose: Demonstrates how TypeError occurs when using a value incorrectly.
 * Key Points:
 *  - Happens when calling or assigning invalid types
 *  - Use type checks or TS/JSDoc to prevent
 * Run: node src/03-error-handlings/01-core-concepts/js-errors/01-type-error.js
 * Expected:
 *  - TypeError is caught with message: "num is not a function"
 */

try {
  const num = 5;
  num(); // TypeError: num is not a function
} catch (err) {
  console.error("TypeError caught:", err.message);
}