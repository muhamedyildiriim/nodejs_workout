/**
 * File: /02-project-infrastructure/06-advanced-fs-tools/01-fs-extra.js
 * Topic: Project Infrastructure → Advanced FS → `fs-extra`
 * Purpose: Demonstrates `fs-extra` (FS choice) for complex operations that are "painful" with the built-in `fs`.
 *
 * Key Points:
 * - `fs-extra` is a drop-in replacement for `fs` but adds *many* new methods.
 * - `fse.ensureDir()`: Creates a directory if it doesn't exist (like `mkdir -p`).
 * - `fse.copy()`: Recursively copies an entire directory (the solution).
 * - `fse.remove()`: Recursively deletes a directory *even if it's not empty*.
 * - `fse.emptyDir()`: Deletes the *contents* of a directory, but not the dir itself.
 *
 * Install: npm install fs-extra
 * Run: node src/02-project-infrastructure/06-advanced-fs-tools/01-fs-extra.js
 * Expected:
 * - Logs "Directory ensured."
 * - Logs "Directory copied."
 * - Logs "Directory removed."
 */

import fse from "fs-extra";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// --- Robust Path Setup ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sourceDir = join(__dirname, "temp_source");
const destDir = join(__dirname, "temp_dest");
const demoFilePath = join(sourceDir, "demo.txt");
// -------------------------

async function runFsExtraDemo() {
  console.log("--- Starting `fs-extra` Demo ---");

  try {
    // 1. Ensure Directory (`mkdir -p`)
    // This creates `temp_source` *and* writes the file.
    await fse.ensureDir(sourceDir);
    await fse.writeFile(demoFilePath, "Hello from fs-extra");
    console.log(`1. Directory ensured and file written at: ${sourceDir}`);

    // 2. Copy Directory (`cp -R`)
    // This copies the *entire* `temp_source` directory to `temp_dest`.
    await fse.copy(sourceDir, destDir);
    console.log(`2. Directory copied from ${sourceDir} to ${destDir}`);
    const copiedData = await fse.readFile(join(destDir, "demo.txt"), "utf8");
    console.log(`   (Verified copy: ${copiedData.trim()})`);

    // 3. Remove Directory (`rm -rf`)
    // This removes the *entire* directory and its contents.
    await fse.remove(sourceDir);
    await fse.remove(destDir);
    console.log("3. Cleanup: Removed temp directories.");
  } catch (err) {
    console.error("`fs-extra` demo failed:", err.message);
  }
}

runFsExtraDemo();

// Notes:
// - `fs-extra` methods are "Promise-based" by default.
// - This is the "go-to" tool for build scripts, scaffolding, and any "real-world" file system manipulation.