/**
 * Topic: Error Handling → JS Errors → ReferenceError
 * Purpose: Shows how ReferenceError occurs when using undeclared variables.
 * Key Points:
 *  - Happens when a variable is not in current scope
 *  - Prevent with ESLint 'no-undef' or explicit declarations
 * Run: node src/03-error-handlings/01-core-concepts/js-errors/02-reference-error.js
 * Expected:
 *  - ReferenceError is caught with message: "a is not defined"
 */

try {
  // eslint-disable-next-line no-undef
  console.log(a); // ReferenceError
} catch (err) {
  console.error("ReferenceError caught:", err.message);
}