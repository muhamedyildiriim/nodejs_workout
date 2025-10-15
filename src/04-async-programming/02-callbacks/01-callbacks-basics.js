/**
 * Topic: Async Programming → Callbacks
 * Purpose: Demonstrates the foundational asynchronous pattern used before Promises and async/await.
 * Key Points:
 *  - A callback is a function passed to another function, executed after an operation completes.
 *  - Convention: (err, result) — always handle errors first.
 *  - Ensure callbacks are called once; guard against double invocations.
 *  - Common in legacy Node APIs, streams, and EventEmitters.
 * Run: node src/04-async-programming/02-callbacks/01-callbacks-basics.js
 * Expected:
 *  - Logs: "Callback result: { ok: true }"
 */

function fetchData(cb) {
  // Simulate async operation (e.g., database read, network call)
  setTimeout(() => cb(null, { ok: true }), 200);
}

// Standard Node.js callback style: (err, data)
fetchData((err, data) => {
  if (err) return console.error("Error:", err);
  console.log("Callback result:", data);
});

// Notes:
// - The (err, result) pattern is the core of Node.js asynchronous APIs.
// - Avoid "callback hell" by breaking logic into small, named functions or by migrating to Promises.
// - Use util.promisify() to modernize callback-based APIs step by step.