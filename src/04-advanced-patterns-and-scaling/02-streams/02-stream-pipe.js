/**
 * File: /04-advanced-patterns-and-scaling/02-streams/02-stream-pipe.js
 * Topic: Advanced Patterns → Streams → `.pipe()` (The Solution)
 * Purpose: Demonstrates the `.pipe()` method, which is the tool for connecting streams and solving the "Large File Problem".
 *
 * Key Points:
 * - `.pipe()`: The "magic" tool.
 * - `readableStream.pipe(writableStream)`
 * - It *automatically* handles all the "manual" `data` and
 * `end` events from `01-stream-basics.js`.
 * - **Most Importantly:** `.pipe()` *automatically* handles
 * **Backpressure**. (We will demo this in `04-backpressure.js`).
 *
 * Run:
 * 1. (It will create `large-file.txt` and `copy.txt` in this directory)
 * 2. node src/04-advanced-patterns-and-scaling/02-streams/02-stream-pipe.js
 *
 * Expected:
 * - "Setup: Created large (50MB) file."
 * - ".pipe(): Copy started..."
 * - ".pipe(): Copy finished successfully."
 * - (The `copy.txt` file will be created efficiently)
 */

import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// --- Robust Path Setup ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const largeFilePath = join(__dirname, "large-file.txt");
const copyPath = join(__dirname, "copy.txt");
// -------------------------

// --- Setup: Create a large dummy file ---
try {
  const dummyData = "Node.js Stream Data\n".repeat(1024 * 1024 * 2.5); // ~50MB
  fs.writeFileSync(largeFilePath, dummyData);
  console.log(`Setup: Created large (50MB) file at ${largeFilePath}`);
} catch (err) {
  console.error("Setup failed:", err.message);
}
// ----------------------------------------------------

// --- The Solution: `.pipe()` ---
console.log(".pipe(): Copy started (low memory usage)...");
console.time("Pipe_Copy_Time");

const readStream = fs.createReadStream(largeFilePath);
const writeStream = fs.createWriteStream(copyPath);

// The "magic" line.
// This one line replaces all the `source.on('data', ...)`
// and `source.on('end', ...)` logic.
readStream.pipe(writeStream);

// We must listen for the *finish* event on the *writable* stream
writeStream.on("finish", () => {
  console.log(".pipe(): Copy finished successfully.");
  console.timeEnd("Pipe_Copy_Time");
  // Clean up
  // fs.unlinkSync(largeFilePath);
  // fs.unlinkSync(copyPath);
});

writeStream.on("error", (err) => {
  console.error(".pipe() Error (Write Stream):", err.message);
});
readStream.on("error", (err) => {
  console.error(".pipe() Error (Read Stream):", err.message);
});

// Notes:
// - `.pipe()` is the "99% solution" for streams.
// - **"The Problem":** Error handling with `.pipe()` is "tricky".
//   If the `writeStream` fails, the `readStream` *does not*
//   automatically close, leading to "memory leaks".
// - This "error handling" "pain point" is solved by `03-stream-pipeline.js`.