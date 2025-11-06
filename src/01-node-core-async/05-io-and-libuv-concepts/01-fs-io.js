/**
 * File: /01-node-core-and-async/05-io-and-libuv-concepts/01-fs-io.js
 * (PHASE 1: THEORY FILE)
 * Topic: Async Programming → I/O & libuv → File System (Non-Blocking)
 * Purpose: Demonstrates asynchronous disk I/O using fs/promises and libuv’s thread pool.
 * Key Points:
 * - Disk ops (like `readFile`) run in libuv's C++ thread pool,
 * keeping the main JavaScript event loop free.
 * - This is the "Waiter" (Garson) in our "Single Cook" (Aşçı) analogy.
 * - Always prefer `fs/promises` or `fs.readFile` (async) over `readFileSync` (sync).
 * Run: node src/01-node-core-async/05-io-and-libuv-concepts/01-fs-io.js
 * Expected:
 * - Prints the I/O elapsed time and the byte length of *this* file.
 */

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// Get the path to the current file itself to read it.
const currentFilePath = fileURLToPath(import.meta.url);

async function runFileReadDemo() {
  console.log("Starting async file read (delegating to Libuv Thread Pool)...");
  console.time("io-timer");

  // This `await` pauses *this function*, but Node.js's
  // main thread is free to do other work.
  const data = await readFile(currentFilePath);

  console.timeEnd("io-timer"); // Will log how long the I/O *actually* took
  console.log("File read complete.");
  console.log("Bytes:", data.byteLength);
}

runFileReadDemo();

/*
Notes:
- libuv offloads file system calls to a background thread pool.
- Async I/O keeps the main event loop responsive to other requests.
- For very large files, prefer streaming (fs.createReadStream) to prevent memory pressure.
*/