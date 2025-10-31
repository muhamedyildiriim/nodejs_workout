/**
 * Topic: File System → Advanced Path Usage
 * Purpose: Demonstrates real-world scenarios combining __dirname, process.cwd(), and path utilities.
 * Key Points:
 *  - Safely locate and access files regardless of where Node is executed.
 *  - Avoid hardcoded relative paths — use join() or resolve().
 *  - Understand cwd vs __dirname differences in file access.
 * Run: node src/05-files-and-paths/03-path-module/02-path-advanced.js
 * Expected:
 *  - Logs absolute paths.
 *  - Reads the correct file even when run from different working directories.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Recreate __dirname / __filename for ESM modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("=== PATH ADVANCED DEMONSTRATION ===\n");

// Combine __dirname + path.join() for local file access
const localFilePath = path.join(__dirname, "data", "example.txt");
console.log("Local File Path (using __dirname + join):", localFilePath);

// Use path.resolve() to build from the current working directory
const cwdBasedPath = path.resolve("src", "05-files-and-paths", "04-path-advanced", "data", "example.txt");
console.log("CWD-based Path (using resolve):", cwdBasedPath);

// Compare with process.cwd()
console.log("process.cwd():", process.cwd());
console.log("__dirname:", __dirname);

// Demonstrate cross-platform normalization
const messy = "/users//mami/../projects///node//file.txt";
console.log("path.normalize:", path.normalize(messy));

// Check absolute vs relative paths
console.log("Is localFilePath absolute?", path.isAbsolute(localFilePath));
console.log("Is './temp.txt' absolute?", path.isAbsolute("./temp.txt"));

// Extract path parts (realistic example)
const parsed = path.parse(localFilePath);
console.log("Parsed path info:", parsed);
console.log("File name only:", parsed.base);
console.log("File extension:", parsed.ext);
console.log("Parent directory:", parsed.dir);

// Read a file safely (using __dirname)
try {
  const content = fs.readFileSync(localFilePath, "utf-8");
  console.log("\nFile content read successfully:");
  console.log(content);
} catch (err) {
  console.error("\nError reading file:", err.message);
}

// Show dynamic switching with process.chdir()
console.log("\n--- Simulating directory change ---");
process.chdir("..");
console.log("New working directory:", process.cwd());

// Read the same file again safely using __dirname (still works)
try {
  const content = fs.readFileSync(localFilePath, "utf-8");
  console.log("\nFile still accessible via __dirname path:");
  console.log(content);
} catch (err) {
  console.error("Error after chdir:", err.message);
}

// Create a new file path dynamically using path.format()
const newPathObject = {
  dir: path.join(__dirname, "output"),
  name: "result",
  ext: ".log",
};
const formattedPath = path.format(newPathObject);
console.log("\nGenerated new file path:", formattedPath);

// Write a simple log file using that path
try {
  fs.mkdirSync(path.join(__dirname, "output"), { recursive: true });
  fs.writeFileSync(formattedPath, "Process completed successfully.");
  console.log("Log file created successfully!");
} catch (err) {
  console.error("Failed to create log file:", err.message);
}

// Notes:
// - path.join() builds relative paths safely based on __dirname.
// - path.resolve() creates absolute paths starting from process.cwd().
// - process.chdir() changes the working directory, but __dirname stays fixed.
// - Always use __dirname when accessing files local to the module.
// - Use resolve() when building paths relative to where Node was launched.
// - parse() + format() allow dynamic path manipulation (useful in build tools or CLIs).