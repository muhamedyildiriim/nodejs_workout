/**
 * Topic: Node.js Core → fs (File System) Module
 * Purpose: Demonstrates essential file system operations using synchronous and asynchronous methods.
 * Key Points:
 *  - fs allows reading, writing, updating, and deleting files/directories.
 *  - Always use path.join() or path.resolve() for safe cross-platform file paths.
 *  - Async versions are preferred in production; sync versions are easier for learning.
 * Run: node src/05-files-and-paths/04-fs-module/01-fs-basics.js
 * Expected:
 *  - Demonstrates file creation, reading, appending, renaming, and deletion.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Recreate __dirname (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("=== FS MODULE DEMONSTRATION ===\n");

// 1- Define file paths safely
const dataDir = path.join(__dirname, "data");
const filePath = path.join(dataDir, "example.txt");

// Ensure the directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log("Created directory:", dataDir);
}

// 2- Write to a file (synchronous)
fs.writeFileSync(filePath, "Hello, Node.js File System!");
console.log("File created successfully:", filePath);

// 3- Read file (synchronous)
const contentSync = fs.readFileSync(filePath, "utf-8");
console.log("File content (sync read):", contentSync);

// 4- Append to the file
fs.appendFileSync(filePath, "\nAppended line: File operations in Node.js.");
console.log("Appended additional content.");

// 5- Read again (to verify append)
const updatedContent = fs.readFileSync(filePath, "utf-8");
console.log("\nUpdated file content:\n", updatedContent);

// 6- Rename the file
const renamedPath = path.join(dataDir, "renamed.txt");
fs.renameSync(filePath, renamedPath);
console.log("\nFile renamed to:", renamedPath);

// 7- Copy the file
const copyPath = path.join(dataDir, "copy.txt");
fs.copyFileSync(renamedPath, copyPath);
console.log("File copied to:", copyPath);

// 8- Check file stats
const stats = fs.statSync(copyPath);
console.log("\nFile Stats:", {
  size: stats.size + " bytes",
  isFile: stats.isFile(),
  createdAt: stats.birthtime,
  modifiedAt: stats.mtime,
});

// 9- Delete a file
fs.unlinkSync(copyPath);
console.log("\nDeleted:", copyPath);

// 10- Read and list directory contents
const files = fs.readdirSync(dataDir);
console.log("\nCurrent directory contents:", files);

// 11- Clean up (optional)
fs.rmSync(renamedPath);
console.log("Removed remaining file:", renamedPath);

// Notes:
// - fs.writeFileSync / readFileSync: Block execution until complete (useful for scripts).
// - fs.writeFile / readFile: Async versions — preferred for servers.
// - fs.mkdirSync({ recursive: true }): Creates nested directories if needed.
// - fs.unlinkSync(): Deletes a single file.
// - fs.rmSync(path, { recursive: true }): Deletes folders (Node v14+).
// - fs.statSync(): Returns metadata about a file (size, timestamps, etc.).
// - Always combine fs with path to avoid OS path separator issues.