/**
 * Topic: Async Programming → Event Loop → Phases
 * Purpose: Demonstrates how Node.js processes callbacks across the event loop phases.
 * Key Points:
 *  - Timers → I/O → Idle/Prepare → Poll → Check → Close
 *  - setTimeout runs in Timers; setImmediate in Check
 *  - Promises and nextTick are microtasks, executed between phases
 * Run: node src/04-async-programming/05-event-loop-phases/01-event-loop-phases.js
 * Expected:
 *  - Logs showing phase order: Sync → Microtasks → Timers/I/O → Check
 */

import fs from "node:fs";

setImmediate(() => console.log("[Check] setImmediate"));
setTimeout(() => console.log("[Timers] setTimeout 0"), 0);

fs.readFile(new URL(import.meta.url), () => {
  console.log("[I/O callbacks] fs.readFile done");
});

Promise.resolve().then(() => console.log("[Microtask] promise then"));
process.nextTick(() => console.log("[Microtask] nextTick"));

console.log("[Sync] start");

/*
Notes:
- The event loop is powered by libuv, which divides execution into distinct phases.
- Poll is the core phase: waits for I/O and executes ready callbacks.
- Check runs setImmediate() callbacks immediately after poll.
- Close handles teardown (e.g., socket 'close' events).
- Microtasks (Promises, nextTick) run between major phases.
- Use this knowledge to understand latency, scheduling, and trace timing behavior in production.
*/