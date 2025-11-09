/**
 * File: /02-project-infrastructure/04-path-module/01-path-basics.js
 * Topic: Project Infrastructure → The `path` Module → Core Utilities
 * Purpose: Demonstrates the core `path` module utilities for creating
 * "robust" and cross-platform (Windows/Mac/Linux) paths.
 *
 * Key Points:
 * - `path` is a crucial built-in module for file system infrastructure.
 * - NEVER join paths using string concatenation (e.g., `dir + '/' + file`).
 * - `path.join()`: Creates a cross-platform-safe path (uses `\` or `/` correctly).
 * - `path.resolve()`: Creates an *absolute* path from a sequence of paths.
 * - `path.basename()`: Gets the filename part.
 * - `path.extname()`: Gets the file extension.
 *
 * Run: node src/02-project-infrastructure/04-path-module/01-path-basics.js
 * Expected:
 * - Logs normalized, joined, resolved, and parsed path components.
 */

import path from "node:path";

// 1. path.join() - The most important method.
// It normalizes the path and uses the correct OS-specific separator.
const myPath = path.join("users", "my-app", "files", "demo.txt");
console.log("path.join():", myPath);
// On Mac/Linux: "users/my-app/files/demo.txt"
// On Windows: "users\\my-app\\files\\demo.txt"

// It also handles messy paths:
const messyPath = path.join("/users//", "admin", "../", "public");
console.log("path.join() (normalized):", messyPath); // Output: /users/public

// 2. path.resolve() - Creates an *absolute* path.
// It resolves from right-to-left until an absolute path is found.
// If no absolute path is found, it prepends the Current Working Directory.
const absolutePath = path.resolve("src", "utils", "index.js");
console.log("path.resolve() (absolute):", absolutePath);
// Output: /Users/your-name/projects/nodejs_workout/src/utils/index.js

// 3. path.basename() - Gets the last part (e.g., the file name).
console.log("path.basename():", path.basename(myPath)); // Output: demo.txt

// 4. path.extname() - Gets the file extension.
console.log("path.extname():", path.extname(myPath)); // Output: .txt

// 5. path.parse() - Gets all parts as an object.
const pathObject = path.parse(absolutePath);
console.log("path.parse():", pathObject);
/*
Output:
{
  root: '/',
  dir: '/Users/your-name/projects/nodejs_workout/src/utils',
  base: 'index.js',
  ext: '.js',
  name: 'index'
}
*/