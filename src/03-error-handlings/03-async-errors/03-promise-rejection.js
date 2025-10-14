/**
 * Topic: Error Handling → Async Errors → Promise Rejections
 * Purpose: Demonstrates handled and unhandled Promise rejections, and process-level handling.
 * Key Points:
 *  - Promise.reject() creates rejected Promises
 *  - Handled rejections use .catch()
 *  - Unhandled rejections trigger global warnings or crashes
 * Run: node src/03-error-handlings/03-async-errors/03-promise-rejection.js
 * Expected:
 *  - Logs both handled and unhandled Promise rejection messages
 */

//
// Handled Promise rejection
//
Promise.reject(new Error("Rejected Promise!"))
  .catch((err) => console.error("Handled Rejection:", err.message));

//
// Unhandled Promise rejection (bad practice)
//
Promise.reject(new Error("Unhandled Promise Rejection!"));

//
// Async function rejection
//
async function getData() {
  throw new Error("Async/Await Rejection!");
}
getData().catch((err) =>
  console.error("Async error caught:", err.message)
);

//
// Global process-level handler
//
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Notes:
// - Always handle rejections locally or globally.
// - Use process.on('unhandledRejection') only as a fallback, not main logic.