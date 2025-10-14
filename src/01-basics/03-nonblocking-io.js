/**
 * File: 01-basics/03-nonblocking-io.js
 * Topic: Non-blocking I/O
 * Purpose: Demonstrate how Node.js performs I/O asynchronously without blocking the event loop.
 * Key Points:
 *  - Node.js delegates file and network I/O to libuv’s thread pool.
 *  - While I/O is handled in the background, the main thread keeps executing.
 *  - This design enables high concurrency with minimal resource usage.
 *  - Non-blocking I/O is the foundation of Node’s scalability.
 * Run: node src/01-basics/03-nonblocking-io.js
 * Expected:
 *  - Logs "I finished earlier!" before "File has been read".
 */

import fs from "node:fs";

// Non-blocking I/O
// Instead of waiting for blocking tasks, move on to the next ones.

export function runNonBlockingIODemo() {
  fs.readFile("file.txt", "utf8", () => console.log("File has been read"));
  console.log("I finished earlier!");
  // Node’s strength comes from I/O, not CPU.
}

runNonBlockingIODemo();