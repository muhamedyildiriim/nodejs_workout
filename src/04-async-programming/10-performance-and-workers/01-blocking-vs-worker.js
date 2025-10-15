/**
 * Topic: Async Programming → Performance & Workers → CPU Offloading
 * Purpose: Demonstrates how to offload CPU-bound work to worker threads to keep the event loop responsive.
 * Key Points:
 *  - CPU-heavy operations block the event loop and delay I/O
 *  - Use Worker threads to parallelize computation across cores
 *  - Communicate via messages using structured-clone or transferable data
 * Run: node src/04-async-programming/10-performance-and-workers/01-blocking-vs-worker.js
 * Expected:
 *  - Logs elapsed worker time and result (sum)
 */

import { Worker, isMainThread, parentPort } from "node:worker_threads";

function cpuHeavy(n = 1e8) {
  let s = 0;
  for (let i = 0; i < n; i++) s += i;
  return s;
}

if (isMainThread) {
  console.time("worker");
  const w = new Worker(new URL(import.meta.url));
  w.on("message", (v) => {
    console.timeEnd("worker");
    console.log("sum", v);
  });
} else {
  parentPort.postMessage(cpuHeavy());
}

/*
Notes:
- CPU-bound work (hashing, compression, parsing) blocks the event loop.
- Worker threads allow true parallelism without blocking async I/O.
- Transfer data efficiently using ArrayBuffers or SharedArrayBuffer.
- Pool workers for recurring workloads; limit concurrency to CPU cores.
- Ideal for analytics, media processing, and heavy computation services.
*/