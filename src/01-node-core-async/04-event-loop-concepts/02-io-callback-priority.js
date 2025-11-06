/**
 * File: /01-node-core-async/04-event-loop-concepts/02-io-callback-priority.js
 * (PHASE 3: MASTERY REFACTOR)
 * Topic: Event Loop Priority *Inside* an I/O Callback
 * Purpose: Demonstrates that even *inside* an I/O callback (a Macrotask),
 * the "Cook's Priority List" (Microtasks first) *still* applies
 * before the *next* Macrotask.
 *
 * Key Points:
 * - When the "Waiter" (Libuv) delivers the `fs.readFile` result,
 * the "Cook" (Main Thread) executes that callback.
 * - *Inside* that callback, new Microtasks and Macrotasks are scheduled.
 * - The "Cook" will *immediately* process the new Microtasks
 * (`nextTick`, `Promise.then`) before moving to the *next* Macrotask
 * in the main queue (like `setImmediate`).
 *
 * Run: node src/01-node-core-async/04-event-loop-concepts/02-io-callback-priority.js
 * Expected:
 * - (Order may vary slightly, but I/O Microtasks run before I/O Macrotasks)
 * [sync] start
 * [sync] end
 * [microtask] process.nextTick
 * [microtask] Promise.then
 * [macrotask] setTimeout 0
 * [macrotask] setImmediate
 * [I/O callbacks] fs.readFile done
 * [I/O -> microtask] nextTick inside readFile
 * [I/O -> microtask] promise.then inside readFile
 * [I/O -> macrotask] setTimeout 0 inside readFile
 * [I/O -> macrotask] setImmediate inside readFile
 */

import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url); // Use robust pathing

console.log("[sync] start");

process.nextTick(() => console.log("[microtask] process.nextTick"));
Promise.resolve().then(() => console.log("[microtask] Promise.then"));

setImmediate(() => console.log("[macrotask] setImmediate"));
setTimeout(() => console.log("[macrotask] setTimeout 0"), 0);

// Inside I/O callback: microtasks still run before next event loop phase.
fs.readFile(__filename, () => {
  console.log("[I/O callbacks] fs.readFile done");

  // These "urgent notes" (Microtasks) are handled *immediately*
  // after the I/O callback finishes.
  process.nextTick(() =>
    console.log("[I/O -> microtask] nextTick inside readFile")
  );
  Promise.resolve().then(() =>
    console.log("[I/O -> microtask] promise.then inside readFile")
  );

  // These "new orders" (Macrotasks) are put *back* into the main
  // event loop queues and run later.
  setImmediate(() =>
    console.log("[I/O -> macrotask] setImmediate inside readFile")
  );
  setTimeout(() =>
    console.log("[I/O -> macrotask] setTimeout 0 inside readFile"), 0
  );
});

console.log("[sync] end");