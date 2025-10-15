/**
 * Topic: Async Programming → Timers & Microtasks → process.nextTick vs Promise.then
 * Purpose: Demonstrates how Node.js schedules microtasks (process.nextTick, Promise.then)
 *           before macrotasks (setTimeout, setImmediate, I/O phases).
 * Key Points:
 *  - Microtasks run immediately after the current operation — before any timers or I/O.
 *  - Order: sync → nextTick → Promise.then → timers / I/O / setImmediate.
 *  - Overusing nextTick can starve the event loop; keep handlers minimal.
 *  - Use bounded bursts to balance performance and responsiveness.
 * Run: node src/04-async-programming/04-timers-nexttick-immediate/01-nexttick-microtask.js
 * Expected:
 *  - Logs (typical order):
 *      [sync] start
 *      [sync] end
 *      [microtask] process.nextTick
 *      [microtask] Promise.then
 *      [timers] setTimeout 0
 *      [check] setImmediate
 *      [I/O callbacks] fs.readFile done
 *      [I/O -> microtask] nextTick inside readFile
 *      [I/O -> microtask] promise.then inside readFile
 *      [I/O -> timers] setTimeout 0 inside readFile
 *      [I/O -> check] setImmediate inside readFile
 */

import fs from "node:fs";

// ❗ __filename is not defined in ES modules (because "type": "module" disables CommonJS globals)
// 💡 Fix: Manually recreate it using 'import.meta.url' → convert URL to path
// Example:
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

console.log("[sync] start");

process.nextTick(() => console.log("[microtask] process.nextTick"));
Promise.resolve().then(() => console.log("[microtask] Promise.then"));

setImmediate(() => console.log("[check] setImmediate"));
setTimeout(() => console.log("[timers] setTimeout 0"), 0);

console.log("[sync] end");

// Inside I/O callback: microtasks still run before next event loop phase.
fs.readFile(__filename, () => {
  console.log("[I/O callbacks] fs.readFile done");

  process.nextTick(() => console.log("[I/O -> microtask] nextTick inside readFile"));
  Promise.resolve().then(() => console.log("[I/O -> microtask] promise.then inside readFile"));

  setImmediate(() => console.log("[I/O -> check] setImmediate inside readFile"));
  setTimeout(() => console.log("[I/O -> timers] setTimeout 0 inside readFile"), 0);
});

// Safe bounded nextTick pattern — prevents starvation.
function boundedNextTickBurst(total = 3000, chunk = 300) {
  let done = 0;

  const burst = () => {
    const limit = Math.min(done + chunk, total);
    while (done < limit) {
      done++;
    }
    if (done < total) {
      // Yield control to the loop between bursts
      setImmediate(() => process.nextTick(burst));
    } else {
      console.log("[bounded] completed microtask bursts without starving the loop");
    }
  };

  process.nextTick(burst);
}

boundedNextTickBurst();

// Notes:
// - process.nextTick has higher priority than Promise.then (Node-specific).
// - Excessive nextTick usage can delay timers, I/O, and user interactions.
// - In production, prefer Promise microtasks or yield back via setImmediate for long loops.