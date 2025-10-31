/**
 * Topic: Node.js → glob (Pattern Matching for File Paths)
 * Purpose: Demonstrates basic usage of the 'glob' package for pattern-based file matching.
 * Key Points:
 */
  // - Glob allows flexible file searching using wildcard patterns (e.g., **/*.js, *.txt, etc.).
/*
 *  - Common in build tools, test runners, and CLI utilities (e.g., ESLint, Jest, Webpack).
 *  - Always resolve paths using path.join() or path.resolve() to ensure cross-platform safety.
 * Run: node src/05-files-and-paths/05-glob-globby/01-glob-basics.js
 * Expected:
 *  - Demonstrates simple pattern searches and lists matched files in a given directory.
 */

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { glob } from "glob";

// Recreate __dirname (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("=== GLOB MODULE (BASICS) ===\n");

// 1- Define the base directory
const baseDir = path.join(__dirname, "sample");

// 2- Explain the concept
console.log("Base Directory:", baseDir);
console.log(
  "We'll use glob patterns to find files dynamically (no manual directory scanning required).\n"
);

// 3- Basic pattern: match all .js files recursively
const patternAllJs = "**/*.js";

// 4- Run the pattern
const matchedJsFiles = await glob(patternAllJs, { cwd: baseDir, absolute: true });

console.log("All .js files (recursively):");
console.log(matchedJsFiles.length ? matchedJsFiles.join("\n") : "→ No matches found.");
console.log("\n");

// 5- Match specific pattern: top-level .txt files only
const patternTopTxt = "*.txt";
const matchedTxtFiles = await glob(patternTopTxt, { cwd: baseDir, absolute: true });

console.log("Top-level .txt files:");
console.log(matchedTxtFiles.length ? matchedTxtFiles.join("\n") : "→ No matches found.");
console.log("\n");

// 6- Match nested JSON files in any subdirectory
const patternJson = "**/*.json";
const matchedJsonFiles = await glob(patternJson, { cwd: baseDir, absolute: true });

console.log("Nested .json files:");
console.log(matchedJsonFiles.length ? matchedJsonFiles.join("\n") : "→ No matches found.");
console.log("\n");

// 7- Combine multiple patterns (using an array)
const combinedPatterns = ["**/*.md", "**/*.config.js"];
const combinedMatches = await glob(combinedPatterns, { cwd: baseDir, absolute: true });

console.log("Combined pattern results (.md and .config.js):");
console.log(combinedMatches.length ? combinedMatches.join("\n") : "→ No matches found.");

// Notes:
// - The glob module supports patterns like:
//     *: any characters except directory separators
//     **: any number of nested directories
//     ?: single character
//     {a,b}: matches any of the comma-separated patterns
// - Example: "**/*.js" → every JS file under this folder (recursively).
// - Common use cases:
//     - Load all test files in a test suite
//     - Find all build or config files for a CLI tool
//     - Automatically discover assets, templates, etc.
// - Always provide { cwd, absolute } options for predictable and consistent output paths.
// - For advanced usage: exclusion patterns (!pattern), ignore options, and streaming mode.