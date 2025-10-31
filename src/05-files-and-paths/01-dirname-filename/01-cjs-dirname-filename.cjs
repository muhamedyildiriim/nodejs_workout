/**
 * Topic: Node.js Core → __dirname and __filename (CommonJS)
 * Purpose: Demonstrates how Node.js exposes the current file and directory paths automatically.
 * Key Points:
 *  - __dirname: absolute directory of the current module.
 *  - __filename: absolute file path (directory + filename).
 *  - Useful for reading/writing files relative to the module’s location.
 * Run: node src/05-files-and-paths/01-dirname-filename/01-cjs-dirname-filename.cjs
 * Expected:
 *  - Prints the directory and file paths.
 *  - Demonstrates that each module gets its own __dirname and __filename.
 */

const path = require("path");

console.log("=== __dirname and __filename (CommonJS) ===\n");

console.log("__dirname:", __dirname);
console.log("__filename:", __filename);

// Combine with path.join for a file in the same folder
const filePath = path.join(__dirname, "data", "sample.txt");
console.log("\nJoined file path:", filePath);

// Show that every required module has its own values
const helper = require("./helper.cjs");
helper.showPaths();

// Notes:
// - __dirname / __filename exist only in CommonJS modules.
// - They are injected by Node’s module wrapper function.
// - Always use path.join() or path.resolve() to build safe paths.
// - Never concatenate raw strings like __dirname + "/file" (platform dependent).