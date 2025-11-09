/**
 * File: /02-project-infrastructure/05-fs-module/01-fs-stats.js
 * Topic: Project Infrastructure → `fs` Module → Stats & Existence
 * Purpose: Demonstrates how to get file metadata (stats) and the
 * modern, "Architect's" (Mimar) way to check if a file exists.
 *
 * Key Points:
 * - `fsp.stat(path)`: Asynchronously returns a `fs.Stats` object.
 * - `stats.isFile()`, `stats.isDirectory()`, `stats.size` are common properties.
 * - **The "Architect's" (Mimar) Way to Check Existence:**
 * - "Classic" (Phase 1) way: `fs.access()` (which is complex).
 * - "Modern" (Phase 3) way: `await fsp.stat()` inside a `try...catch`
 * block. If it throws an 'ENOENT' error, the file does not exist.
 *
 * Run: node src/02-project-infrastructure/05-fs-module/01-fs-stats.js
 * Expected:
 * - Logs the stats object for *this file* (01-fs-stats.js).
 * - Logs "File exists: true"
 * - Logs "File 'nonexistent.txt' does not exist (ENOENT)."
 */

import { promises as fsp } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Use the "robust" (sağlam) pathing we learned in `02-path-module`
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to check file stats
async function getFileStats(filePath) {
  console.log(`\n--- Checking stats for: ${filePath} ---`);
  try {
    const stats = await fsp.stat(filePath);
    console.log("Stats Object:", stats);
    console.log("Is it a file?", stats.isFile());
    console.log("Is it a directory?", stats.isDirectory());
    console.log("Size (bytes):", stats.size);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      // ENOENT = Error, No ENTry (or file/directory not found)
      console.log(`File '${filePath}' does not exist (ENOENT).`);
    } else {
      console.error("Failed to get stats:", error.message);
    }
    return false;
  }
}

// Run the demo
(async () => {
  // 1. Check a file that *does* exist (this file)
  const fileExists = await getFileStats(__filename);
  console.log("File exists:", fileExists);

  // 2. Check a file that *does not* exist
  const nonexistentPath = join(__dirname, "nonexistent.txt");
  const nonexistentExists = await getFileStats(nonexistentPath);
  console.log("File exists:", nonexistentExists);
})();