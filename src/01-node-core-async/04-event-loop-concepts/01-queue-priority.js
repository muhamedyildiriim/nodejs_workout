/**
 * File: /01-node-core-async/04-event-loop-concepts/01-queue-priority.js
 * (PHASE 3: MASTERY REFACTOR)
 * Topic: Event Loop Queue Priority (Microtask vs. Macrotask)
 * Purpose: This is the "Mastery Demo" that *proves* the "Cook's Priority List":
 * The Event Loop *always* processes Microtasks *before* Macrotasks.
 *
 * Key Points (The Priority List):
 * - 1. Synchronous Code (The "Cook's" main job on the counter)
 * - 2. Microtasks (The "Cook's" urgent mental notes)
 * - 3. Macrotasks (The "Waiter's" orders from the oven/kitchen)
 *
 * Run: node src/01-node-core-async/04-event-loop-concepts/01-queue-priority.js
 * Expected Output:
 * 1. (Sync) Main thread execution.
 * 2. (Microtask) process.nextTick()
 * 3. (Microtask) Promise.resolve()
 * 4. (Macrotask) setTimeout
 * 5. (Macrotask) setImmediate
 */

// This function is exported for the `01-orchestrator`
export function runEventLoopDemo() {
  // We wrap the *entire* demo in a Promise.
  // This allows our `01-orchestrator/index.js` to `await`
  // the completion of this demo.
  return new Promise((resolve) => {
    // 3. MACROTASK (Timer Phase)
    setTimeout(() => {
      console.log("4. (Macrotask) setTimeout");
    }, 0);

    // 3. MACROTASK (Check Phase)
    setImmediate(() => {
      console.log("5. (Macrotask) setImmediate");
      // This is the last macrotask, so we resolve the Promise
      // for the Orchestrator.
      resolve();
    });

    // 2. MICROTASK (Promise Queue)
    Promise.resolve().then(() => {
      console.log("3. (Microtask) Promise.resolve()");
    });

    // 2. MICROTASK (Highest Priority Microtask)
    process.nextTick(() => {
      console.log("2. (Microtask) process.nextTick()");
    });

    // 1. SYNC (Main Call Stack)
    console.log("1. (Sync) Main thread execution.");
  });
}

// This "guard" allows the file to be run *directly*
if (process.argv[1]?.endsWith("01-queue-priority-demo.js")) {
  runEventLoopDemo();
}