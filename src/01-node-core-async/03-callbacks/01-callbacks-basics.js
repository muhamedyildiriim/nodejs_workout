/**
 * File: /01-node-core-async/03-callbacks/01-callbacks.js
 * Topic: Node.js Core → The Callback Pattern
 * Purpose: Demonstrates the foundational asynchronous pattern (the "Classic" way)
 * used before Promises and async/await.
 * Key Points:
 * - A callback is a function passed to another function, executed
 * after an operation completes.
 * - Convention: (err, result) — the "error-first" callback.
 * - This is how the "Waiter" (Libuv) reports back to the "Cook" (Main Thread).
 * - This pattern leads to "Callback Hell" in complex code.
 * Run: node src/01-node-core-async/03-callbacks/01-callbacks.js
 * Expected:
 * - Logs: "Callback result: { ok: true }"
 */

function fetchData(cb) {
  // Simulate async operation (e.g., database read, network call)
  // The "Waiter" (Libuv) is "in the kitchen" for 200ms.
  setTimeout(() => {
    // After 200ms, the "Waiter" brings the result to the "Cook"
    // by calling the `cb` function.
    const data = { ok: true };
    const err = null;
    cb(err, data);
  }, 200);
}

console.log("Main Thread: Asking 'Waiter' (fetchData) for data...");

// Standard Node.js callback style: (err, data)
fetchData((err, data) => {
  // This code runs *later*, when the 'cb' function is called.
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("Main Thread: 'Waiter' delivered data!");
  console.log("Callback result:", data);
});

console.log("Main Thread: Moving on to other work (non-blocking)...");

// 

// Notes:
// - The (err, result) "error-first" pattern is the core of "Classic" (Phase 1) Node.js APIs.
// - Avoid "callback hell" by breaking logic into small, named functions
//   or by migrating to Promises (The "Architect's Choice" - Phase 3).
// - Use `util.promisify()` to modernize callback-based APIs.