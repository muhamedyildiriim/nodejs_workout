/**
 * File: /02-project-infrastructure/05-fs-module/03-fs-promises.js
 * Topic: Project Infrastructure → `fs` Module → `fs/promises`
 * Purpose: Demonstrates the modern way to handle file I/O using the `fs/promises` module with `async/await`.
 *
 * Key Points:
 * - This is the standard.
 * - `import { promises as fsp } from 'node:fs';` (or `import fsp from 'node:fs/promises'`).
 * - Allows us to use `async/await` and `try...catch` blocks.
 * - This is *infinitely* more readable and maintainable than
 * "Callback Hell".
 *
 * Run: node src/02-project-infrastructure/05-fs-module/03-fs-promises.js
 * Expected:
 * - "1. (Sync) Main Thread: Starting async 'read-append-read'..."
 * - "3. (Sync) Main Thread: CONTINUES while I/O is in progress."
 * - "2. (Async) Data read:", ...
 * - "4. (Async) Data appended."
 * - "5. (Async) New data read:", ...
 */

import { promises as fsp } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, "demo-promises.txt");

async function runAsyncFileOperations() {
  console.log("1. (Sync) Main Thread: Starting async 'read-append-read'...");
  try {
    // 1. Write an initial file
    await fsp.writeFile(filePath, "Initial data.\n");

    // 2. Read the file
    const data = await fsp.readFile(filePath, "utf8");
    console.log("2. (Async) Data read:", data.trim());

    // 3. Append to the file
    await fsp.appendFile(filePath, "Appended data.\n");
    console.log("4. (Async) Data appended.");

    // 4. Read the new file content
    const newData = await fsp.readFile(filePath, "utf8");
    console.log("5. (Async) New data read:", newData.trim());

    // 5. Clean up (optional)
    // await fsp.unlink(filePath);
    // console.log("6. (Async) Cleaned up file.");
  } catch (error) {
    console.error("An error occurred during async file operations:", error.message);
  }
}

runAsyncFileOperations();

console.log("3. (Sync) Main Thread: CONTINUES while I/O is in progress.");