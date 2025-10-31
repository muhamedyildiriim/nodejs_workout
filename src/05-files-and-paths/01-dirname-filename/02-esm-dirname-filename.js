/**
 * Topic: Node.js Core → __dirname and __filename (ESM)
 * Purpose: Demonstrates how to recreate __dirname and __filename in ECMAScript Modules.
 * Key Points:
 *  - ESM modules do not provide __dirname/__filename automatically.
 *  - We can derive them using import.meta.url + fileURLToPath() + dirname().
 *  - Use these for absolute, reliable file path resolution in ESM projects.
 * Run: node src/05-files-and-paths/01-dirname-filename/02-esm-dirname-filename.js
 * Expected:
 *  - Same behavior as CommonJS version but implemented manually.
 */

import { fileURLToPath } from "url";
import { dirname, join } from "path";

console.log("=== __dirname and __filename (ESM) ===\n");

// Recreate __filename and __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("__filename:", __filename);
console.log("__dirname:", __dirname);

// Combine with path.join for a test path
const samplePath = join(__dirname, "data", "example.txt");
console.log("\nJoined path:", samplePath);

// Demonstrate use inside a function
function logPaths() {
  console.log("\n[Inside logPaths()]");
  console.log("__filename:", __filename);
  console.log("__dirname:", __dirname);
}
logPaths();

// Notes:
// - ESM uses import.meta.url (a file:// URL) instead of Node wrapper variables.
// - fileURLToPath() converts the URL to a filesystem path string.
// - dirname() extracts the directory portion.
// - Works only if "type": "module" is set in package.json or file uses .mjs extension.