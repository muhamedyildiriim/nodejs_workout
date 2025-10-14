/**
 * Topic: Error Handling → JS Errors → AggregateError
 * Purpose: Demonstrates AggregateError produced by Promise.any() when all inputs reject.
 * Key Points:
 *  - AggregateError contains an `errors` array with individual reasons
 *  - Handle each inner error to provide clearer diagnostics
 * Run: node src/03-error-handlings/01-core-concepts/js-errors/07-aggregate-error.js
 * Expected:
 *  - Logs each inner error message when Promise.any() rejects with AggregateError
 */

const p = Promise.any([
  Promise.reject(new Error("Network A down")),
  Promise.reject(new Error("Network B down")),
]);

p.catch((err) => {
  if (err instanceof AggregateError) {
    console.error("AggregateError caught:");
    for (const e of err.errors) {
      console.error("   →", e instanceof Error ? e.message : String(e));
    }
  } else {
    console.error("Unexpected error type:", err);
  }
});
