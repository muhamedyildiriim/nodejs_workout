/**
 * File: /02-project-infrastructure/06-advanced-fs-tools/02-globby.js
 * Topic: Project Infrastructure → Advanced FS → `globby`
 * Purpose: Demonstrates `globby` (file finder) for finding files based on "glob" patterns.
 */

//  * Key Points:
// * - `fs` can't *find* files; it can only *read* known paths.
// * - `globby` finds files using patterns (e.g., `*.js`, `**/*.md`).

/*
 * - `**`: Recursive (recursive) (any directory, any depth).
 * - `*`: Wildcard (joker) (any name).
 * - `!`: Negative pattern (e.g., `!node_modules`).
 * - It is `async` and returns a Promise.
 *
 * Install: npm install globby
 * Run: node src/02-project-infrastructure/06-advanced-fs-tools/02-globby.js
 * Expected:
 * - Logs an array of all `.js` files in the `01-node-core-and-async` directory.
 */

import { globby } from "globby";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// --- Robust Path Setup ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// We will search *outside* this directory, in the "Core" directory.
const searchRoot = join(__dirname, "../../", "01-node-core-and-async");
// -------------------------

async function runGlobbyDemo() {
  console.log("--- Starting `globby` Demo ---");
  console.log(`Searching for files in: ${searchRoot}`);

  try {
    // 1. Define the "Glob" Pattern
    // We want all `.js` files, at *any* depth (`**`), but we want to *ignore* any test files.
    const patterns = [
      "**/*.js", // Include all .js files
      "!**/*.test.js", // Exclude test files
    ];

    // 2. Run the search
    const paths = await globby(patterns, {
      cwd: searchRoot, // The directory to search *from*
      absolute: false, // Return relative paths
      onlyFiles: true, // Don't include directories
    });

    console.log("\nFound `.js` files (relative to search root):");
    console.log(paths);
  } catch (err) {
    console.error("`globby` demo failed:", err.message);
  }
}

runGlobbyDemo();

// Notes:
// - `globby` is the difference-making tool used inside test runners (like Jest), build tools (like Vite), and linters (like ESLint) to find all relevant source files.