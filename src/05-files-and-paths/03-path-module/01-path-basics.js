/**
 * Topic: Node.js Core → path module
 * Purpose: Demonstrates how to work with file and directory paths safely and cross-platform.
 * Key Points:
 *  - Avoid manual string concatenation; use path utilities instead.
 *  - Handles Windows "\" and POSIX "/" differences automatically.
 *  - Common functions: join, resolve, basename, dirname, extname, parse, format.
 * Run: node src/05-files-and-paths/03-path-module/01-path-basics.js
 * Expected:
 *  - Prints detailed outputs showing how each path function works.
 */

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Recreate __dirname / __filename (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("=== PATH MODULE DEMONSTRATION ===\n");

// path.join(...segments)
// Joins multiple path segments using the correct OS separator.
// It does NOT resolve absolute paths automatically.
const joined = path.join(__dirname, "assets", "images", "..", "logo.png");
console.log("path.join:", joined);

// path.resolve(...segments)
// Resolves segments into an absolute path from current working directory.
// If an absolute path appears, it stops resolving beyond that point.
const resolved = path.resolve("src", "assets", "images", "logo.png");
console.log("path.resolve:", resolved);

// path.basename(p)
// Returns the last portion of a path (file name).
const fileName = path.basename(joined);
console.log("path.basename:", fileName);

// path.dirname(p)
// Returns the directory portion (everything except the file name).
const dirName = path.dirname(joined);
console.log("path.dirname:", dirName);

// path.extname(p)
// Returns the extension, including the dot.
const ext = path.extname(joined);
console.log("path.extname:", ext);

// path.parse(p)
// Breaks a path into an object: { root, dir, base, ext, name }
const parsed = path.parse(joined);
console.log("path.parse:", parsed);

// path.format(obj)
// Reverses parse() — builds a path from an object.
const formatted = path.format({
  dir: parsed.dir,
  name: "index",
  ext: ".html",
});
console.log("path.format:", formatted);

// path.isAbsolute(p)
// Checks if the given path is absolute.
console.log("path.isAbsolute(__dirname):", path.isAbsolute(__dirname));
console.log("path.isAbsolute('./relative/path'):", path.isAbsolute("./relative/path"));

// path.sep and path.delimiter
// OS-specific separators (useful for cross-platform scripting).
console.log("path.sep:", path.sep); // "/" on POSIX, "\\" on Windows
console.log("path.delimiter:", path.delimiter); // ":" on POSIX, ";" on Windows

// path.normalize(p)
// Cleans up redundant slashes, ".." or "." parts.
const messy = "/users//mami/../projects///node//file.txt";
console.log("path.normalize:", path.normalize(messy));

console.log("\n=== COMBINED EXAMPLE ===");

// Combine __dirname and a relative file safely:
const filePath = path.join(__dirname, "data", "input.json");
console.log("Safe full path (using join):", filePath);

// Combine using resolve (absolute path from current cwd):
const absoluteFile = path.resolve("data", "input.json");
console.log("Absolute path (using resolve):", absoluteFile);

// Notes:
// - path.join() joins path segments relative to __dirname (or given base).
// - path.resolve() builds an absolute path starting from process.cwd().
// - basename(), dirname(), and extname() extract parts of the path.
// - parse() and format() allow easy transformation of file paths.
// - Always use path utilities for cross-platform compatibility.
// - Avoid hardcoding "/" or "\\" in your file paths.