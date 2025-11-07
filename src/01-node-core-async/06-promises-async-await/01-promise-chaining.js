/**
 * File: /01-node-core-async/06-promises-async-await/01-promise-chaining.js
 * (PHASE 3: REFACTORED)
 * Topic: Promises (The "Classic" .then/.catch Syntax)
 * Purpose: Demonstrates how Promises standardize async control flow and
 * replace "Callback Hell" using `.then()` chaining.
 * Key Points:
 * - A Promise is a proxy for a future value (pending → fulfilled or rejected).
 * - `.then()` handles success, `.catch()` handles failure.
 * - This file shows the "classic" (Phase 1) way of handling async logic.
 * Run: node src/01-node-core-async/06-promises-async-await/01-promise-chaining.js
 */

const delay = (ms, value, shouldReject = false) =>
  new Promise((resolve, reject) =>
    setTimeout(() => (shouldReject ? reject(new Error(value)) : resolve(value)), ms)
  );

// 1. Sequential chaining (The ".then() chain")
console.log("Starting: .then() chain...");
delay(100, "step1")
  .then((v) => v.toUpperCase())
  .then((v) => `${v} -> step2`)
  .then(console.log)
  .catch((e) => console.error("chain error:", e.message))
  .finally(() => console.log("chain done"));

// 2. Parallel execution (Fails-fast)
console.log("Starting: Promise.all...");
Promise.all([delay(120, "A"), delay(80, "B")])
  .then(([a, b]) => console.log("parallel:", a, b))
  .catch((e) => console.error("parallel error:", e.message));

// 3. AllSettled: (The "safe" parallel - waits for all, even failures)
console.log("Starting: Promise.allSettled...");
Promise.allSettled([delay(50, "ok"), delay(60, "boom", true)]).then(
  (results) => console.log("allSettled:", results.map((r) => r.status))
);

// 4. Race: (The "fastest" one wins)
console.log("Starting: Promise.race...");
Promise.race([delay(100, "slow"), delay(10, "fast")]).then((v) =>
  console.log("race winner:", v)
);