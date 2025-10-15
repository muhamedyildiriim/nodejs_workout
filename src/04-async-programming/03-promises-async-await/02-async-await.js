/**
 * Topic: Async Programming → Promises → async/await
 * Purpose: Demonstrates how async/await provides cleaner syntax over Promises for sequential and parallel flows.
 * Key Points:
 *  - async/await makes asynchronous code look synchronous and easier to read.
 *  - Use try/catch to handle errors — each await can throw.
 *  - Use Promise.all for parallel tasks to avoid unnecessary latency.
 *  - Top-level await is allowed only in ESM modules or controlled environments.
 * Run: node src/04-async-programming/03-promises-async-await/02-async-await.js
 * Expected:
 *  - Logs: 
 *      seq: ~400ms
 *      par: ~200ms
 *    showing the difference between sequential and parallel awaits.
 */

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

async function sequential() {
  console.time("seq");
  await wait(200);
  await wait(200);
  console.timeEnd("seq");
}

async function parallel() {
  console.time("par");
  await Promise.all([wait(200), wait(200)]);
  console.timeEnd("par");
}

sequential().then(parallel);

// Notes:
// - async/await improves readability and error handling in async workflows.
// - Always await or return Promises to avoid unhandled rejections.
// - For independent work, run tasks concurrently with Promise.all().
// - This pattern scales naturally in service endpoints or API orchestrations.