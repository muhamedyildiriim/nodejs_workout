/**
 * File: 01-basics/01-index.js (PHASE 3: ARCHITECT'S REFACTOR)
 * Topic: Orchestrating Basic Node.js Async Demos
 * Purpose: Serve as the entry point that sequentially awaits the completion of each demo.
 * Key Points:
 * - We wrap our logic in an `async function` (e.g., `main()`).
 * - We use `await` on each demo. This *pauses* the orchestrator (but not the Event Loop!) until that demo is finished.
 * - This forces a sequential, clean output, making the demos understandable and preventing a "race condition" between them.
 * Run: node src/01-node-core-async/01-orchestrator/index.js
 * Expected:
 * - Logs for Event Loop, *then* all its async tasks.
 * - Then logs for Non-blocking I/O, *then* all its async tasks.
 * - ...and so on. A clean, predictable, sequential flow.
 */

import { runEventLoopDemo } from "../04-event-loop-concepts/01-queue-priority.js";
import { runNonBlockingIODemo } from "../05-io-and-libuv-concepts/03-blocking-vs-nonblocking.js";
import {
  runBasicPromiseDemo,
  runPromiseUseCases,
} from "../06-promises-async-await/03-parallel-vs-sequential.js";


// We create an async "main" function to use top-level await.
// This is the "Architect's" way to control async flow.
async function runDemosSequentially() {
  console.log("=== Starting Demos Sequentially ===");

  console.log("\n=== 1. Event Loop Demo (Starting...) ===");
  // "The Cook" (Main Thread) will now WAIT here until this demo
  // (and all its async tasks) are fully completed.
  await runEventLoopDemo();
  console.log("=== 1. Event Loop Demo (Finished) ===");

  console.log("\n=== 2. Promises: Basic Demo (Starting...) ===");
  await runBasicPromiseDemo();
  console.log("=== 2. Promises: Basic Demo (Finished) ===");

  console.log("\n=== 3. Non-blocking I/O Demo (Starting...) ===");
  // This line will NOT run until runEventLoopDemo() is finished.
  await runNonBlockingIODemo();
  console.log("=== 3. Non-blocking I/O Demo (Finished) ===");

  console.log("\n=== 4. Promises: Use Cases (Starting...) ===");
  // This `await` was already in your original code. It was the
  // only part that was correctly pausing the flow.
  await runPromiseUseCases();
  console.log("=== 4. Promises: Use Cases (Finished) ===");

  console.log("\n=== (PHASE 3) All Demos Completed ===");
}

// Run the main orchestration function
runDemosSequentially().catch((err) => {
  console.error("A critical error occurred in the demo orchestrator:", err);
});