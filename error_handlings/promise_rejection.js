// ============================================
// =========== PROMISE REJECTIONS =============
// ============================================

// Errors caused by Promise rejections (handled and unhandled)

// Handled promise rejection
Promise.reject(new Error("Rejected Promise!"))
  .catch(err => console.error("Handled Rejection:", err.message));

// Unhandled promise rejection (bad practice)
Promise.reject(new Error("Unhandled Promise Rejection!"));

// Handle async function error with try/catch
async function getData() {
  throw new Error("Async/Await Rejection!");
}
getData().catch(err => console.error("Async error caught:", err.message));

// process-level handler
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});