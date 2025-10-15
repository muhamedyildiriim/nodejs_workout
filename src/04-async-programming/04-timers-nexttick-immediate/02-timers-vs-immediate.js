/**
 * Topic: Async Programming → Timers & Microtasks → setTimeout(0) vs setImmediate
 * Purpose: Demonstrates the scheduling difference between timers (setTimeout) and check phase (setImmediate).
 * Key Points:
 *  - setTimeout(callback, 0) runs during the "timers" phase of the event loop.
 *  - setImmediate(callback) runs in the "check" phase — typically after I/O callbacks.
 *  - process.nextTick() and Promise microtasks run before both.
 *  - Under heavy I/O, setImmediate may fire sooner than setTimeout(0).
 * Run: node src/04-async-programming/04-timers-nexttick-immediate/02-timers-vs-immediate.js
 * Expected:
 *  - Typical order (may vary slightly by environment):
 *      sync
 *      nextTick
 *      promise
 *      timeout 0
 *      immediate
 */

setTimeout(() => console.log("timeout 0"), 0);
setImmediate(() => console.log("immediate"));
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("promise"));
console.log("sync");

// Notes:
// - Both setTimeout(0) and setImmediate() schedule callbacks asynchronously,
//   but they belong to different event loop phases.
// - Never assume deterministic ordering — I/O timing can invert them.
// - Prefer setImmediate() when you want to run code "after I/O" but before timers.
// - process.nextTick() and Promise microtasks always run before both.