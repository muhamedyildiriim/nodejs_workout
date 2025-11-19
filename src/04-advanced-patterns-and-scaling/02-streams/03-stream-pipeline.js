/**
 * File: /04-advanced-patterns-and-scaling/02-streams/03-stream-pipeline.js
 * Topic: Advanced Patterns → Streams → `stream.pipeline()` (Robust Errors)
 * Purpose: Demonstrates the "Modern" and "Robust"
 * `stream.pipeline()` tool.
 *
 * Key Points:
 * - **The Problem with `.pipe()`:** `readStream.pipe(writeStream)`
 * does *not* automatically destroy the `readStream` if the
 * `writeStream` fails (e.g., "Permission Denied").
 * This creates "memory leaks".
 * - **The Solution:** `stream.pipeline()`.
 * - `pipeline(readStream, writeStream, callback)`
 * - It *automatically* handles "backpressure" (like `.pipe()`).
 * - **"The 'Difference-Making' Feature":** It *automatically*
 * destroys *all* streams in the "pipeline"
 * if *any* of them fails.
 * - It provides a *single, clean* callback for handling errors.
 *
 * Install: npm install
 * Run: node src/04-advanced-patterns-and-scaling/02-streams/03-stream-pipeline.js
 * Expected:
 * - "pipeline: Copy finished successfully."
 * - "pipeline (ERROR): Error (Expected): EACCES..."
 */

import { pipeline } from "node:stream";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// --- Robust Path Setup ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sourceFile = join(__dirname, "large-file.txt"); // (From previous demo)
const destFile = join(__dirname, "pipeline-copy.txt");
const errorFile = "/root/permission-denied.txt"; // (We can't write here)
// -------------------------

// --- 1. The "Successful" Pipeline ---
console.log("--- Starting `stream.pipeline` (Success) Demo ---");
const readStream1 = fs.createReadStream(sourceFile);
const writeStream1 = fs.createWriteStream(destFile);

pipeline(readStream1, writeStream1, (err) => {
  if (err) {
    console.error("pipeline (Success) failed:", err.message);
  } else {
    console.log("pipeline: Copy finished successfully.");
    // fs.unlinkSync(destFile); // Cleanup
  }
});

// --- 2. The "Robust Error-Handling" Pipeline ---
console.log("\n--- Starting `stream.pipeline` (Error) Demo ---");
const readStream2 = fs.createReadStream(sourceFile);
// This *will fail* because we don't have permission to write to `/root/`
const errorWriteStream = fs.createWriteStream(errorFile);

pipeline(readStream2, errorWriteStream, (err) => {
  // `pipeline` *catches* the error, *closes both* streams,
  // and passes the error *here*.
  if (err) {
    console.log(`pipeline (ERROR): Error (Expected): ${err.message}`);
  } else {
    console.log("pipeline (ERROR) finished (This should not happen).");
  }
});