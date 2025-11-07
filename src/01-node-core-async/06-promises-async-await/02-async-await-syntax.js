/**
 * File: /01-node-core-async/06-promises-async-await/02-async-await-syntax.js
 * (PHASE 3: REFACTORED)
 * Topic: Promises → `async/await` (The "Modern" Syntax)
 * Purpose: Demonstrates how `async/await` provides cleaner, "synchronous-looking"
 * syntax for handling Promises and their errors.
 * Key Points:
 * - `async` keyword: Makes a function *automatically* return a Promise.
 * - `await` keyword: *Pauses* the `async function` (not the Event Loop!)
 * until the Promise settles.
 * - `try...catch`: The modern, "Architect's" way to handle errors from `await`.
 * Run: node src/01-node-core-async/06-promises-async-await/02-async-await-syntax.js
 * Expected:
 * - Logs: seq (Bad): ~400ms
 * - Logs: par (Good): ~200ms
 */

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

// "BAD ARCHITECTURE": Awaiting independent tasks sequentially.
// Total time = 200ms + 200ms = 400ms
async function sequential() {
  console.time("seq (Bad)");
  await wait(200); // Waits 200ms...
  await wait(200); // *Then* waits another 200ms.
  console.timeEnd("seq (Bad)");
}

// "THE ARCHITECT'S WAY": Awaiting independent tasks in parallel.
// Total time = time of the *slowest* task (200ms).
async function parallel() {
  console.time("par (Good)");
  // Dispatches *both* 200ms tasks at the same time.
  await Promise.all([wait(200), wait(200)]);
  console.timeEnd("par (Good)");
}

// Run the demos sequentially to see the logged times
async function main() {
  console.log("Demonstrating `await` vs `Promise.all` timing:");
  await sequential();
  await parallel();
}

main();

// Notes:
// - `async/await` is "syntactic sugar" over Promises.
// - This file proves that `Promise.all` is the "Architect's" tool for performance.