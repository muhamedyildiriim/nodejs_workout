/**
 * File: /02-project-infrastructure/05-fs-module/02-sync-vs-async-callback.js
 * Topic: Project Infrastructure → `fs` Module → Sync vs. Async (The "Sin")
 * Purpose: **Proves** why `readFileSync` (Sync) is "The Sin"
 * that blocks the Event Loop, while `readFile` (Async) is
 * the correct "non-blocking" choice.
 *
 * Key Points:
 * - `readFileSync`: **BLOCKS** the Main Thread. The "Cook" does the work personally. No other code (even `console.log`) can run.
 * - `readFile`: **NON-BLOCKING**. Delegates the I/O to the Libuv Thread Pool (the "Waiter"). The Main Thread continues running.
 *
 * Run: node src/02-project-infrastructure/05-fs-module/02-sync-vs-async-callback.js
 * Expected:
 * - "1. (Sync) Main Thread: Dispatching async order..."
 * - "3. (Sync) Main Thread: CONTINUES while async is in progress."
 * - "2. (Async Callback) Libuv 'Waiter' finished I/O."
 * - (If you un-comment the "Sync" code, it will run *before* #3)
 */

import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, "demo.txt"); // Create this file

// --- 1. The "Sin" (The Blocking Way) ---
// This blocks the *entire* application.
// console.time("SyncRead");
// console.log("--- Starting SYNC Read (The 'Sin')... ---");
// try {
//   const data = fs.readFileSync(filePath, "utf8");
//   console.log("SYNC Read Data:", data.length);
// } catch (err) {
//   console.error("SYNC Error:", err.message);
// }
// console.timeEnd("SyncRead"); // e.g., 2ms (The app froze for 2ms)
// console.log("--- Finished SYNC Read. ---");

// --- 2. The "Classic" (Async Callback Way) ---
// This is non-blocking. It delegates to the Libuv Thread Pool.
console.time("AsyncRead");
console.log("1. (Sync) Main Thread: Dispatching async order (fs.readFile)...");

fs.readFile(filePath, "utf8", (err, data) => {
  // This callback runs *later*, when the Event Loop
  // picks it up from the Macrotask queue.
  if (err) {
    console.error("ASYNC Error:", err.message);
    return;
  }
  console.log("2. (Async Callback) Libuv finished I/O. Data length:", data.length);
  console.timeEnd("AsyncRead"); // e.g., 5ms (The app was *not* frozen)
});

console.log("3. (Sync) Main Thread: CONTINUES while async is in progress.");