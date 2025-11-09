/**
 * File: /02-project-infrastructure/04-path-module/02-esm-dirname-solution.js
 * Topic: Project Infrastructure → `path` Module → The ESM `__dirname` Solution
 * Purpose: Demonstrates the "Architect's" (Mimar) solution to the
 * most common "fark yaratan" (difference-making) problem in modern Node.js:
 * `__dirname` and `__filename` are NOT available in ES Modules.
 *
 * Key Points:
 * - In CJS, you get `__dirname` for free.
 * - In ESM, you must *create* it yourself.
 * - The "Architect's" solution uses `import.meta.url` (a `file://` URL)
 * - We use `fileURLToPath` (from `node:url`) to convert the URL to a string path.
 * - We use `dirname` (from `node:path`) to get the directory of that file.
 *
 * Run: node src/02-project-infrastructure/04-path-module/02-esm-dirname-solution.js
 * Expected:
 * - Logs the "file://" URL from `import.meta.url`.
 * - Logs the robust, absolute path to the *current file*.
 * - Logs the robust, absolute path to the *current directory*.
 * - Logs the robust, absolute path to a 'demo.txt' file *next to* this file.
 */

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// 1. The ESM "Magic Variable" (Sihirli Değişken)
// This is the *URL* of the current module file.
const currentFileURL = import.meta.url;
console.log("1. import.meta.url (The URL):", currentFileURL);

// 2. The "Tool" to convert URL to Path
// This converts "file:///Users/..." to "/Users/..."
const currentFilePath = fileURLToPath(currentFileURL);
console.log("2. fileURLToPath (The File Path):", currentFilePath);

// 3. The "Tool" to get the Directory
// This is the "Architect's" (Mimar) modern equivalent of `__filename`
const __filename_esm = currentFilePath;
// This is the "Architect's" (Mimar) modern equivalent of `__dirname`
const __dirname_esm = dirname(__filename_esm);

console.log("3. The 'Architect's' __dirname (The Dir Path):", __dirname_esm);

// 4. The "Robust" (Sağlam) Path
// Now we can robustly join paths *relative to our file*, no matter
// *where* the `node` command was run from.
const demoTxtPath = join(__dirname_esm, "data", "demo.txt");
console.log("4. Robust Path to data/demo.txt:", demoTxtPath);

// Notes:
// - This `import.meta.url` pattern is the *only* correct way to get
//   the current file path in an ES Module.
// - This is the solution to the "kırılgan" (brittle) path problem we saw
//   in `01-node-core-and-async`'s `demo.txt` file.