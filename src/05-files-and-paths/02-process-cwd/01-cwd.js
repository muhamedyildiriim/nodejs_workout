/**
 * Topic: Node.js Core → process.cwd()
 * Purpose: Demonstrates how process.cwd() returns the current working directory of the Node process,
 *          and how it differs from __dirname. Also shows how to safely change and use working directories.
 * Key Points:
 *  - process.cwd() → the directory from which Node was executed.
 *  - __dirname → the physical directory of the current file.
 *  - process.chdir(path) can temporarily change the working directory.
 *  - Always build safe absolute paths using path.join() or path.resolve().
 * Run:
 *   1. node src/05-files-and-paths/02-process-cwd/01-cwd.js
 *   2. cd .. && node src/05-files-and-paths/02-process-cwd/01-cwd.js
 * Expected:
 *   - See different cwd values depending on where Node is executed.
 *   - Demonstrates safe file access under both cwd and __dirname contexts.
 */

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

// ESM-compatible __dirname / __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("=== process.cwd() Demonstration ===\n");

console.log("__dirname:", __dirname);
console.log("process.cwd():", process.cwd());

// 1) Create a sample directory and file relative to __dirname
const dataDir = path.join(__dirname, "data");
const filePath = path.join(dataDir, "info.txt");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log("\nCreated directory:", dataDir);
}

fs.writeFileSync(filePath, "This file is created relative to __dirname.\n");
console.log("Created file:", filePath);

// 2) Create another file relative to the current working directory
const cwdFile = path.resolve("cwd-info.txt"); // resolves relative to process.cwd()
fs.writeFileSync(cwdFile, "This file is created relative to process.cwd().\n");
console.log("Created file (cwd-based):", cwdFile);

// 3) Show how cwd changes when using process.chdir()
console.log("\n--- Changing working directory ---");
process.chdir(".."); // go up one level
console.log("New process.cwd():", process.cwd());

// 4) Demonstrate that __dirname is unaffected
console.log("__dirname (unchanged):", __dirname);

// 5) Safely read file again using __dirname-based path (still valid)
try {
  const content = fs.readFileSync(filePath, "utf-8");
  console.log("\nReading file from __dirname-based path succeeded:");
  console.log(content);
} catch (err) {
  console.error("Failed to read file after chdir:", err.message);
}

// 6) Attempt reading cwd-based file after chdir (may fail if path no longer valid)
try {
  const cwdContent = fs.readFileSync("cwd-info.txt", "utf-8");
  console.log("\nReading cwd-based file succeeded (relative path):");
  console.log(cwdContent);
} catch (err) {
  console.error("Reading cwd-based file failed:", err.message);
}

// Notes:
// - process.cwd() depends on where the Node process was started (terminal directory).
// - __dirname depends on the file’s actual location in the filesystem.
// - Changing cwd with process.chdir() does NOT affect __dirname.
// - Always use __dirname for stable module-relative file paths.
// - Use process.cwd() for CLI or config loaders that should respect user’s execution directory.