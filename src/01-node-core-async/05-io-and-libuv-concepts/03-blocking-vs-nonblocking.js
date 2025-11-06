/**
 * File: 01-node-core-async/05-io-and-libuv-concepts/03-blocking-vs-nonblocking.js
 * Topic: Blocking vs. Non-blocking I/O (The "Architect's Choice")
 * Purpose: Compare the "Sin" (Blocking), the "Classic" (Callback),
 * and the "Architect's Choice" (Promise) for I/O.
 * Key Points:
 * - 1. `readFileSync` (The "Sin"): BLOCKS the Cook (Main Thread). Never use this.
 * - 2. `readFile` (The "Classic"): Non-blocking. "Gives order to Waiter" (Libuv).
 * - 3. `fs.promises.readFile` (The "Architect's Choice"): Modern, non-blocking,
 * works with async/await.
 * - This function returns a Promise (by being `async`) so the Orchestrator
 * (`01-orchestrator/index.js`) can `await` its completion.
 * Run: node src/01-node-core-async/05-io-and-libuv-concepts/03-blocking-vs-nonblocking.js
 * Expected:
 * - 1. (Sync) Cook starts.
 * - 2. (Sync) Cook finishes giving orders.
 * - 3. (Async - Promise) Architect's Choice: File Read (Modern)
 * - 4. (Async - Callback) Classic Way: File Read (Callback)
 * - (The "Sin" (readFileSync) is commented out to prevent blocking)
 */

import fs from "node:fs";
import fsp from "node:fs/promises"; // The "Architect's Choice"

const filePath = "./src/01-node-core-async/05-io-and-libuv-concepts/demo.txt"; // Ensure this file exists

export async function runNonBlockingIODemo() {
  console.log("1. (Sync) The Cook starts giving I/O orders.");

  // --- 1. The "Sin" (The Blocking Way) ---
  // The Cook does the 10-second job *personally* at the counter.
  // The entire restaurant freezes.
  // console.log("--- Starting The 'Blocking' Sin... (Will freeze!) ---");
  // const data = fs.readFileSync(filePath, "utf8"); // NEVER DO THIS
  // console.log("--- 'Blocking' Sin Finished. (Everyone waited) ---");

  // --- 2. The "Classic" (Callback / Non-Blocking) ---
  // The Cook gives the order to a "Waiter" (Libuv).
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Classic Way (Callback) Error:", err);
      return;
    }
    console.log("3. (Async - Callback) Classic Way: File Read (Callback)");
  });

  // --- 3. The "Architect's Choice" (Promise / Non-Blocking) ---
  // The Cook gives the order to a "Modern Waiter" (Libuv + Promise)
  // and can `await` the result if needed (but we won't here,
  // we just let it run).
  fsp
    .readFile(filePath, "utf8")
    .then((data) => {
      console.log("2. (Async - Promise) Architect's Choice: File Read (Modern)");
    })
    .catch((err) => {
      console.error("Architect's Choice (Promise) Error:", err);
    });

  console.log("4. (Sync) The Cook finishes giving orders and moves on.");

  // We need a 'hack' to wait for the I/O to finish
  // for our `01-index.js` orchestrator.
  // We will `await` the "Architect's Choice" promise.
  // (This is just for the demo's sequential flow)
  try {
    await fsp.readFile(filePath, "utf8");
    // This return signifies the *end* of this demo for the orchestrator.
    return;
  } catch (err) {
    console.error("Orchestrator await failed:", err);
  }
}

// Guard to run this file directly
if (process.argv[1].endsWith('03-nonblocking-io.js')) {
  runNonBlockingIODemo();
}