/**
 * File: /02-project-infrastructure/05-fs-module/04-fs-streams.js
 * Topic: Project Infrastructure → `fs` Module → Streams (The "Scalability" Solution)
 * Purpose: Demonstrates the *only* way to handle
 * **large files** (e.g., 10GB video, 2GB CSV) without crashing the server.
 *
 * Key Points:
 * - **The "Sin":** `fsp.readFile(bigFile)`
 * - Tries to load the *entire* 10GB file into RAM.
 * - The server's memory spikes, and it *crashes*.
 *
 * - **The Solution:** `fs.createReadStream()`
 * - Does *not* load the file into RAM.
 * - It reads the file "chunk by chunk" in small buffers.
 * - This maintains low, constant memory usage, no matter the file size.
 * - We use `.pipe()` to "connect" the `ReadStream`
 * to a `WriteStream` (e.g., copying a file, sending it in an HTTP response).
 *
 * Run: node src/02-project-infrastructure/05-fs-module/04-fs-streams.js
 * Expected:
 * - A "large-file-copy.txt" will be created by copying "large-file.txt"
 * *efficiently*, chunk by chunk.
 * - Logs: "Stream: Copy started...", "Stream: Copy finished."
 */

import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// --- Setup: Create a large dummy file to simulate ---
// (In a real app, this file would already exist)
const largeFilePath = join(__dirname, "large-file.txt");
const copyPath = join(__dirname, "large-file-copy.txt");
try {
  // Create a 100MB dummy file for the demo
  const dummyData = "This is one line of data.\n".repeat(1024 * 500); // ~10MB
  fs.writeFileSync(largeFilePath, dummyData.repeat(10)); // 100MB
  console.log(`Setup: Created dummy 100MB file: ${largeFilePath}`);
} catch (err) {
  console.error("Setup failed:", err.message);
}
// -------------------------------------------------------------------

// --- The Solution: Streams ---

console.log("\nStream: Copy started (processing in small chunks)...");
console.time("Stream_Copy_Time");

// 1. Create a faucet to *read* the large file
const readStream = fs.createReadStream(largeFilePath, {
  encoding: "utf8",
  highWaterMark: 64 * 1024, // 64KB chunks
});

// 2. Create a drain to *write* the new file
const writeStream = fs.createWriteStream(copyPath);

// 3. Handle errors
readStream.on("error", (err) =>
  console.error("Stream Read Error:", err.message)
);
writeStream.on("error", (err) =>
  console.error("Stream Write Error:", err.message)
);

// 4. Handle success
writeStream.on("finish", () => {
  console.log("Stream: Copy finished.");
  console.timeEnd("Stream_Copy_Time");
  // Clean up the created files (optional)
  // fs.unlinkSync(largeFilePath);
  // fs.unlinkSync(copyPath);
});

// 5. The Pipe
// This is the magic. It connects the faucet to the drain and handles all the backpressure automatically.
readStream.pipe(writeStream);

// Notes:
// - While this stream is running, the Node.js process memory remains *low and stable*.
// - If we had used `fsp.readFile()`, the process would have required >100MB of RAM and possibly crashed.
// - `pipe()` is the difference-making. Tool for handling large I/O.