/**
 * Topic: Async Programming → I/O & libuv → File System (Non-Blocking)
 * Purpose: Demonstrates asynchronous disk I/O using fs/promises and libuv’s thread pool.
 * Key Points:
 *  - Disk ops run in libuv threads, keeping the event loop free
 *  - Prefer fs/promises over sync APIs for scalability
 *  - Adjust UV_THREADPOOL_SIZE for high-throughput workloads
 * Run: node src/04-async-programming/06-io-and-libuv/01-fs-io.js
 * Expected:
 *  - Prints elapsed I/O time and file byte length without blocking the main thread
 */

import { readFile } from "node:fs/promises";

console.time("io");
const data = await readFile(new URL(import.meta.url));
console.timeEnd("io");
console.log("bytes:", data.byteLength);

/*
Notes:
- libuv offloads file system calls to a background thread pool.
- Async I/O keeps the main event loop responsive to other requests.
- Avoid synchronous fs methods (e.g., readFileSync) in production hot paths.
- For very large files, prefer streaming (fs.createReadStream) to prevent memory pressure.
*/