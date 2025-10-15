/**
 * Topic: Async Programming → Promises
 * Purpose: Demonstrates how Promises standardize asynchronous control flow and replace callback nesting.
 * Key Points:
 *  - A Promise represents a future value: pending → fulfilled or rejected.
 *  - Use .then() to chain async steps and .catch() for centralized error handling.
 *  - Promise.all runs tasks in parallel; Promise.race resolves to the first settled promise.
 *  - Use Promise.allSettled when you need all results, even failed ones.
 * Run: node src/04-async-programming/03-promises-async-await/01-promises.js
 * Expected:
 *  - Logs:
 *      STEP1 -> step2
 *      parallel: A B
 *      allSettled: [ 'fulfilled', 'rejected' ]
 *      race winner: fast
 */

const delay = (ms, value, shouldReject = false) =>
  new Promise((resolve, reject) =>
    setTimeout(() => (shouldReject ? reject(new Error(value)) : resolve(value)), ms)
  );

// Sequential chaining
delay(100, "step1")
  .then((v) => v.toUpperCase())
  .then((v) => `${v} -> step2`)
  .then(console.log)
  .catch((e) => console.error("chain error:", e.message))
  .finally(() => console.log("chain done"));

// Parallel execution
Promise.all([delay(120, "A"), delay(80, "B")])
  .then(([a, b]) => console.log("parallel:", a, b))
  .catch((e) => console.error("parallel error:", e.message));

// AllSettled: aggregate results (success + failure)
Promise.allSettled([delay(50, "ok"), delay(60, "boom", true)]).then((results) =>
  console.log("allSettled:", results.map((r) => r.status))
);

// Race: resolves to whichever finishes first
Promise.race([delay(100, "slow"), delay(10, "fast")]).then((v) =>
  console.log("race winner:", v)
);

// Notes:
// - Always attach .catch() to handle rejections — uncaught rejections terminate Node processes.
// - Promise.all fails fast; use allSettled for mixed outcomes.
// - Return Promises inside .then() chains to preserve execution order.
// - Never create Promises without awaiting or returning them (avoids leaks and race conditions).