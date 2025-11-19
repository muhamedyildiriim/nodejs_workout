/**
 * File: /04-advanced-patterns-and-scaling/04-workers-and-clusters/01-cpu-blocking-demo.js
 * Topic: Advanced Patterns → Scaling → The "CPU Blocking" Problem
 * Purpose: Demonstrates how a heavy CPU task blocks the Main Thread (Event Loop),
 * causing the server to become unresponsive.
 *
 * Key Points:
 * - Node.js handles I/O asynchronously, but CPU tasks are Synchronous.
 * - A long `for` loop or calculation runs on the Main Thread.
 * - While it runs, the server cannot accept new requests.
 *
 * Run:
 * 1. node src/04-advanced-patterns-and-scaling/04-workers-and-clusters/01-cpu-blocking-demo.js
 * 2. Open two browser tabs:
 * - Tab A: http://localhost:3000/fast (Responds immediately)
 * - Tab B: http://localhost:3000/heavy (Starts the CPU task)
 * 3. While Tab B is loading, try to refresh Tab A.
 *
 * Expected:
 * - Tab A will *spin and wait* until Tab B finishes.
 * - This proves the "Single Thread" is blocked.
 */

import express from "express";

const app = express();
const PORT = 3000;

// 1. A Fast Route (Simulates normal traffic)
app.get("/fast", (req, res) => {
  res.send("This was fast!");
});

// 2. A Heavy CPU Route (The "Blocker")
app.get("/heavy", (req, res) => {
  console.log("Starting heavy task...");
  const start = Date.now();

  // Simulate heavy CPU work (e.g., 5 billion loop iterations)
  // This happens ON the Main Thread.
  let total = 0;
  for (let i = 0; i < 5_000_000_000; i++) {
    total += i;
  }

  const duration = Date.now() - start;
  console.log(`Heavy task finished in ${duration}ms`);
  res.send(`Heavy task result: ${total} (Time: ${duration}ms)`);
});

app.listen(PORT, () => {
  console.log(`Blocking Server running on http://localhost:${PORT}`);
});