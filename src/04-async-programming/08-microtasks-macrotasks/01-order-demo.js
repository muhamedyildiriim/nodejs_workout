/**
 * Topic: Async Programming → Microtasks vs Macrotasks → Execution Order
 * Purpose: Illustrates the execution order of microtasks (nextTick, Promises) and macrotasks (timers, immediates).
 * Key Points:
 *  - Microtasks run before macrotasks in Node.js
 *  - process.nextTick() runs before Promise microtasks
 *  - setTimeout() executes in the Timers phase; setImmediate() in the Check phase
 * Run: node src/04-async-programming/08-microtasks-macrotasks/01-order-demo.js
 * Expected:
 *  - Logs in order: sync → nextTick → promise → timeout → immediate
 */

setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
Promise.resolve().then(() => console.log("promise"));
process.nextTick(() => console.log("nextTick"));
console.log("sync");

/*
Notes:
- Microtasks (Promises, nextTick) execute between event loop phases.
- nextTick() is specific to Node.js and precedes other microtasks.
- Macrotasks (timers, I/O, immediates) are queued by libuv phases.
- Understanding this order prevents subtle race conditions and ensures deterministic flow.
*/