/**
 * File: /02-project-infrastructure/06-advanced-fs-tools/03-chokidar.js
 * Topic: Project Infrastructure → Advanced FS → `chokidar`
 * Purpose: Demonstrates `chokidar` (file watcher) for "robust" and cross-platform file system watching.
 *
 * Key Points:
 * - The built-in `fs.watch()` is "unreliable" across platforms (Mac/Win/Linux).
 * - `chokidar` is the *industry standard* that solves these problems. It is the "engine" inside tools
 * like `nodemon`, `Vite`, and `ESLint --watch`.
 * - It uses event emitters (`.on()`) to report changes.
 *
 * Install: npm install chokidar
 * Run:
 * 1. node src/02-project-infrastructure/06-advanced-fs-tools/03-chokidar.js
 * 2. (The script will be running)
 * 3. Go into the `src/02-project-infrastructure/06-advanced-fs-tools/` directory.
 * 4. Create a new file: `test.txt`
 * 5. Edit and save `test.txt`
 * 6. Delete `test.txt`
 *
 * Expected:
 * - The terminal will log "File added: test.txt", "File changed: test.txt",
 * and "File removed: test.txt" in real-time.
 */

import chokidar from "chokidar";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// --- Robust Path Setup ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// We will create a directory to "watch"
const watchDir = join(__dirname, "temp-watch-dir");
// -------------------------

// We must create the directory first
import fs from "node:fs";
if (!fs.existsSync(watchDir)) {
  fs.mkdirSync(watchDir);
}

console.log(`--- Starting \`chokidar\` Demo ---`);
console.log(`Watching for changes in: ${watchDir}`);
console.log("(Try creating, editing, or deleting files in that directory...)");

// 1. Initialize the watcher
const watcher = chokidar.watch(watchDir, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles (e.g., .DS_Store)
  persistent: true,
  ignoreInitial: true, // Don't fire "add" events for *existing* files
});

// 2. Set up event listeners
watcher
  .on("add", (path) => {
    console.log(`EVENT: File added: ${path.split("/").pop()}`);
  })
  .on("change", (path) => {
    console.log(`EVENT: File changed: ${path.split("/").pop()}`);
  })
  .on("unlink", (path) => {
    console.log(`EVENT: File removed: ${path.split("/").pop()}`);
  })
  .on("error", (error) => {
    console.error("Watcher error:", error);
  });

// Notes:
// - This is the difference-making Tool for building "hot-reload" servers, automatic test runners, or file synchronization tools.