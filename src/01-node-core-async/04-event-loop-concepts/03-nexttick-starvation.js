/**
 * File: /01-node-core-and-async/04-event-loop-concepts/03-nexttick-starvation.js
 * (PHASE 3: MASTERY REFACTOR)
 * Topic: Event Loop → `process.nextTick` Starvation
 * Purpose: Demonstrates the "danger" of `process.nextTick` (a recursive
 * Microtask) and how it can "starve" the Event Loop,
 * preventing Macrotasks (like timers) from *ever* running.
 *
 * Key Points:
 * - `process.nextTick` (a Microtask) runs *before* `setTimeout` (a Macrotask).
 * - If you call `process.nextTick` *inside* another `process.nextTick`
 * recursively, you create an infinite Microtask loop.
 * - The Main Thread gets stuck processing the Microtask queue
 * and *never* gets to the Macrotask phases (like Timers or I/O).
 *
 * Run: node src/01-node-core-and-async/04-event-loop-concepts/03-nexttick-starvation.js
 * Expected:
 * - It will *only* log "nextTick" 1000 times.
 * - It will *NEVER* log "setTimeout 0 (NEVER RUNS)".
 * - This proves the "starvation" of the Macrotask queue.
 */

// A Macrotask (Timer)
setTimeout(() => {
  // This line will never be reached.
  console.log("setTimeout 0 (NEVER RUNS)");
}, 0);

let i = 0;

// A recursive Microtask
function recursiveNextTick() {
  i++;
  if (i > 1000) {
    console.log("Recursive nextTick finished. Script will now exit.");
    return;
  }
  console.log(`process.nextTick call count: ${i}`);
  // This schedules *another* Microtask before the loop can
  // *ever* get to the Timers (Macrotask) phase.
  process.nextTick(recursiveNextTick);
}

recursiveNextTick();

/*
Architect's Note:
- This is why `process.nextTick` is considered dangerous when used recursively.
- The "Architect's" solution for long-running CPU tasks that
  must yield back to the Event Loop is to use `setImmediate`
  or `setTimeout(0)` to re-schedule the *next* chunk of work,
  giving other Macrotasks a chance to run.
*/