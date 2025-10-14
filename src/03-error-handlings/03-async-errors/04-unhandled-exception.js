/**
 * Topic: Error Handling → Async Errors → Unhandled Rejections
 * Purpose: Demonstrates what happens when Promises reject without a catch handler.
 * Key Points:
 *  - Missing .catch() causes “Unhandled Promise Rejection” warnings
 *  - Global listener can log last-resort failures
 *  - Always handle async errors explicitly
 * Run: node src/03-error-handlings/03-async-errors/04-unhandled-exception.js
 * Expected:
 *  - Logs "Unhandled Rejection: Oops!"
 */

//
// No catch handler (unhandled rejection)
//
Promise.reject("Oops!");

//
// Global process handler
//
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

// Notes:
// - Use .catch() or try/catch with await to handle async failures.
// - Global handlers should only be for logging, not recovery.