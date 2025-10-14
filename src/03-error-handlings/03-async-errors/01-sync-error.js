/**
 * Topic: Error Handling → Async Errors → Synchronous Errors
 * Purpose: Demonstrates errors that occur immediately during code execution (e.g., logic or reference errors).
 * Key Points:
 *  - Synchronous errors happen instantly in the current call stack
 *  - Use try/catch to handle them immediately
 *  - Typical causes: ReferenceError, TypeError, RangeError, SyntaxError
 * Run: node src/03-error-handlings/03-async-errors/01-sync-error.js
 * Expected:
 *  - Logs: "Caught a synchronous error: y is not defined"
 */

try {
  let x = y + 5; // ReferenceError: y is not defined
  console.log("This line won't run");
} catch (err) {
  console.error("Caught a synchronous error:", err.message);
}
console.log("Program continues...");

// Notes:
// - Appears instantly during code execution.
// - Wrap risky synchronous operations in try/catch.
// - Once caught, execution continues normally.