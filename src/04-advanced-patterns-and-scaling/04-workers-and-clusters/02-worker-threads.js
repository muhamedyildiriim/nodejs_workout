/**
 * File: /04-advanced-patterns-and-scaling/04-workers-and-clusters/02-worker-threads.js
 * Topic: Advanced Patterns → Scaling → Worker Threads (The Solution)
 * Purpose: Demonstrates how to offload heavy CPU tasks to a separate thread
 * using the `worker_threads` module, keeping the Main Thread responsive.
 *
 * Key Points:
 * - `Worker`: Creates a new thread (like a separate Node.js instance).
 * - `parentPort`: Used by the Worker to talk back to the Main Thread.
 * - The Main Thread and Worker communicate via "messages" (events).
 * - This is ideal for image processing, video compression, or complex math.
 *
 * Run:
 * 1. node src/04-advanced-patterns-and-scaling/04-workers-and-clusters/02-worker-threads.js
 * 2. Hit http://localhost:3000/heavy
 * 3. Immediately hit http://localhost:3000/fast
 *
 * Expected:
 * - The `/fast` route responds *immediately*, even while `/heavy` is still running.
 */

import express from "express";
import { Worker, isMainThread, parentPort, workerData } from "node:worker_threads";
import { fileURLToPath } from "node:url";

// --- 1. The Worker Logic (Running in a separate thread) ---
if (!isMainThread) {
  // This block ONLY runs inside the Worker Thread
  const limit = workerData.limit;
  let total = 0;
  for (let i = 0; i < limit; i++) {
    total += i;
  }
  // Send the result back to the Main Thread
  parentPort.postMessage(total);
}

// --- 2. The Main Server Logic (Running in the Main Thread) ---
else {
  const app = express();
  const PORT = 3000;
  const __filename = fileURLToPath(import.meta.url);

  app.get("/fast", (req, res) => {
    res.send("This was fast! (Main thread is free)");
  });

  app.get("/heavy", (req, res) => {
    console.log("Offloading heavy task to Worker Thread...");

    // Create a new Worker and point it to *this file* (__filename)
    const worker = new Worker(__filename, {
      workerData: { limit: 5_000_000_000 },
    });

    // Listen for the message (result) from the Worker
    worker.on("message", (result) => {
      console.log(`Worker finished. Result: ${result}`);
      res.send(`Heavy task result from Worker: ${result}`);
    });

    worker.on("error", (err) => {
      console.error("Worker error:", err);
      res.status(500).send("Worker error");
    });
  });

  app.listen(PORT, () => {
    console.log(`Non-Blocking (Worker) Server running on http://localhost:${PORT}`);
  });
}