/**
 * File: 01-basics/01-index.js
 * Topic: Orchestrating Basic Node.js Async Demos
 * Purpose: Serve as the entry point that sequentially runs the event loop, non-blocking I/O, and promise demos.
 * Key Points:
 *  - Combines individual examples into one unified flow for easier observation.
 *  - Demonstrates async execution order across different mechanisms.
 *  - Can be extended to accept CLI args for running selective demos.
 * Run: node src/01-basics/01-index.js
 * Expected:
 *  - Logs the order and results of event loop, non-blocking I/O, and promise-based flows.
 */

// Orchestration file: runs all demos together.
// You can optionally add CLI arguments to run specific sections only.

import { runEventLoopDemo } from "./02-event-loop.js";
import { runNonBlockingIODemo } from "./03-nonblocking-io.js";
import { runBasicPromiseDemo, runPromiseUseCases } from "./04-promises.js";

console.log("=== Event Loop Demo ===");
runEventLoopDemo();

console.log("\n=== Non-blocking I/O Demo ===");
runNonBlockingIODemo();

console.log("\n=== Promises: Basic Demo ===");
runBasicPromiseDemo();

console.log("\n=== Promises: Use Cases ===");
await runPromiseUseCases();