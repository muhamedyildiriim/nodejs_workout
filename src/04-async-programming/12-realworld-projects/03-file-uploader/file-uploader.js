/**
 * Topic: Async Programming → Real-world Scenarios → Streams & File I/O
 * Purpose: Demonstrates using Node.js streams with the promises-based pipeline to simulate file uploads reliably.
 * Key Points:
 *  - Use streams to handle large files efficiently (constant memory footprint)
 *  - Prefer `stream/promises` pipeline for backpressure-aware piping
 *  - Surface errors with try/catch and fail fast on I/O issues
 * Run: node src/04-async-programming/12-realworld-projects/03-file-uploader/file-uploader.js
 * Expected:
 *  - Copies a sample file into ./uploads/ and logs success; on failure, prints a descriptive error
 */

import fs from "fs";
import { pipeline } from "stream/promises";
import path from "path";

const SRC_FILE = path.resolve("data/sample.txt");      // provide a small sample file
const DEST_DIR = path.resolve("src/04-async-programming/12-realworld/file-uploader/uploads");
const DEST_FILE = path.join(DEST_DIR, "copied.txt");

async function simulateUpload() {
  try {
    await fs.promises.mkdir(DEST_DIR, { recursive: true });
    const readStream = fs.createReadStream(SRC_FILE);
    const writeStream = fs.createWriteStream(DEST_FILE);

    console.log("📤 Upload started...");
    await pipeline(readStream, writeStream);
    console.log("Upload completed:", DEST_FILE);
  } catch (err) {
    console.error("Upload failed:", err.message);
  }
}

simulateUpload();