/**
 * Topic: Node.js → globby (Smart, Promise-based File Matching)
 * Purpose: Demonstrates the basic usage of the 'globby' package — a modern, Promise-based wrapper around glob.
 * Key Points:
 *  - Globby provides powerful async pattern matching with cleaner APIs and advanced defaults.
 *  - Supports multiple patterns, negations, ignores, and dotfiles out of the box.
 *  - Returns absolute or relative paths depending on configuration.
 * Run: node src/05-files-and-paths/05-glob-globby/03-globby-basics.js
 * Expected:
 *  - Demonstrates pattern-based file matching and exclusion using globby.
 */

import { globby } from "globby";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Recreate __dirname (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("=== GLOBBY MODULE (BASICS) ===\n");

// 1- Define base directory
const baseDir = path.join(__dirname, "demo");
if (!fs.existsSync(baseDir)) {
  console.log("Creating demo directory structure...");
  fs.mkdirSync(baseDir, { recursive: true });
  fs.writeFileSync(path.join(baseDir, "index.js"), "// index file\n");
  fs.writeFileSync(path.join(baseDir, "config.json"), "{ \"ok\": true }\n");
  fs.writeFileSync(path.join(baseDir, "notes.txt"), "Hello Globby!\n");
  fs.mkdirSync(path.join(baseDir, "subfolder"));
  fs.writeFileSync(path.join(baseDir, "subfolder", "nested.js"), "// nested file\n");
  fs.writeFileSync(path.join(baseDir, "subfolder", "data.json"), "{ \"nested\": true }\n");
}

console.log("Base directory:", baseDir, "\n");

// 2- Simple pattern: all JS files recursively
const jsPattern = "**/*.js";
const jsFiles = await globby(jsPattern, {
  cwd: baseDir,
  absolute: true,
});

console.log("All JS files (recursive):");
console.log(jsFiles.length ? jsFiles.join("\n") : "→ No matches found.");
console.log("\n");

// 3- Match specific extensions (JSON + TXT)
const multiplePatterns = ["**/*.json", "**/*.txt"];
const multiMatches = await globby(multiplePatterns, {
  cwd: baseDir,
  absolute: true,
});

console.log("All .json and .txt files:");
console.log(multiMatches.length ? multiMatches.join("\n") : "→ No matches found.");
console.log("\n");

// 4- Use negation: include all JS except those inside 'subfolder'
const excludeNested = await globby(["**/*.js", "!subfolder/**/*.js"], {
  cwd: baseDir,
  absolute: true,
});

console.log("JS files excluding 'subfolder':");
console.log(excludeNested.length ? excludeNested.join("\n") : "→ No matches found.");
console.log("\n");

// 5- Include dotfiles (optional)
fs.writeFileSync(path.join(baseDir, ".env"), "SECRET=xyz\n");

const dotIncluded = await globby(["**/*", ".*"], {
  cwd: baseDir,
  absolute: true,
  dot: true,
});

console.log("Files including dotfiles (.env):");
console.log(dotIncluded.length ? dotIncluded.join("\n") : "→ No matches found.");
console.log("\n");

// Notes:
// - Globby builds upon `fast-glob`, providing async-friendly APIs.
// - Patterns follow standard glob rules:
//     **/*.js → match JS files recursively
//     !pattern → exclude matches
//     {a,b} → match any of multiple extensions
// - Common usage:
//     - Load all source files dynamically (e.g., test runners, CLI tools)
//     - Find configuration or data files by extension
//     - Automate batch operations on a project tree
// - Always provide { cwd, absolute } for consistent path resolution.
// - By default, globby ignores node_modules and hidden files unless dot:true.
// - Globby returns a Promise — perfect for async/await flows.