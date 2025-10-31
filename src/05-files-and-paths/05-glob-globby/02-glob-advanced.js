/**
 * Topic: Node.js → glob (Advanced Pattern Matching & Options)
 * Purpose: Demonstrates advanced usage of the 'glob' package: ignore lists, dotfiles, brace expansion,
 *          symlink following, sync vs async APIs, and cross-platform path safety.
 * Key Points:
 *  - Use robust ignore rules (e.g., node_modules, build, test artifacts) for performance and correctness.
 *  - Include dotfiles only when intended (dot: true) and prefer absolute outputs for reliable tooling.
 *  - Favor async glob() in production; globSync() is fine for scripts and build-time utilities.
 * Run: node src/05-files-and-paths/05-glob-globby/02-glob-advanced.js
 * Expected:
 *  - Creates a small demo tree.
 *  - Shows advanced matching scenarios with clear, practical console output.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { glob, globSync } from "glob";

// Recreate __dirname (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("=== GLOB (ADVANCED) DEMONSTRATION ===\n");

// 1- Prepare a controlled demo workspace (so the script is self-contained)
const baseDir = path.join(__dirname, "sample-adv");
const ensureDir = (p) => fs.mkdirSync(p, { recursive: true });
const ensureFile = (p, content = "") => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  if (!fs.existsSync(p)) fs.writeFileSync(p, content);
};

if (!fs.existsSync(baseDir)) {
  console.log("Creating demo workspace:", baseDir);

  // Folders
  ensureDir(path.join(baseDir, "src", "utils"));
  ensureDir(path.join(baseDir, "src", "tests"));
  ensureDir(path.join(baseDir, "node_modules", "deps"));
  ensureDir(path.join(baseDir, ".hidden"));

  // Files
  ensureFile(path.join(baseDir, "src", "index.js"), `console.log("index");\n`);
  ensureFile(path.join(baseDir, "src", "app.test.js"), `test("ok",()=>{});\n`);
  ensureFile(path.join(baseDir, "src", "utils", "helper.js"), `export const x = 1;\n`);
  ensureFile(path.join(baseDir, "src", "data.json"), `{"ok":true}\n`);
  ensureFile(path.join(baseDir, "README.md"), `# Sample ADV\n`);
  ensureFile(path.join(baseDir, "notes.md"), `Some notes\n`);
  ensureFile(path.join(baseDir, "config.config.js"), `export default {};\n`);
  ensureFile(path.join(baseDir, "package.json"), `{"name":"adv-demo"}\n`);
  ensureFile(path.join(baseDir, ".env"), `SECRET=demo\n`);
  ensureFile(path.join(baseDir, ".prettierrc"), `{}\n`);
  ensureFile(path.join(baseDir, "node_modules", "deps", "index.js"), `module.exports={}\n`);
  ensureFile(path.join(baseDir, ".hidden", "dot.txt"), `dot file\n`);

  // Optional symlink to demonstrate follow:true (best-effort cross-platform)
  try {
    const target = path.join(baseDir, "src", "utils");
    const link = path.join(baseDir, "link-to-utils");
    if (!fs.existsSync(link)) {
      fs.symlinkSync(target, link, "dir");
    }
  } catch {
    // On some systems (e.g., Windows without admin), symlink may fail. Ignore.
  }
}

console.log("Base Directory:", baseDir, "\n");

// Common ignore list for demos
const defaultIgnore = [
  "**/node_modules/**", // always ignore dependencies
  "**/dist/**",
  "**/build/**",
];

/**
 * Utility to print results in a consistent, readable format.
 */
function printMatches(label, files) {
  console.log(`\n— ${label} —`);
  if (!files?.length) {
    console.log("→ No matches found.");
    return;
  }
  for (const f of files) console.log(f);
  console.log(`(count: ${files.length})`);
}

/**
 * 2- Include dotfiles intentionally
 *    dot: true will include entries like .env, .prettierrc, and files under .hidden/
 */
{
  const files = await glob(["**/*", ".env", ".prettierrc"], {
    cwd: baseDir,
    absolute: true,
    dot: true,
    nodir: true,
    ignore: defaultIgnore,
  });
  printMatches("DOTFILES INCLUDED (dot:true)", files);
}

/**
 * 3- Exclude test files via ignore (preferred over negated patterns)
 *    Only JS files under src, excluding *.test.js
 */
{
  const files = await glob("src/**/*.js", {
    cwd: baseDir,
    absolute: true,
    nodir: true,
    ignore: [...defaultIgnore, "**/*.test.js"],
  });
  printMatches("JS under src (excluding *.test.js)", files);
}

/**
 * 4- Brace expansion for multiple extensions (e.g., *.md + *.MD)
 *    This captures README.md and notes.md
 */
{
  const files = await glob("**/*.{md,MD}", {
    cwd: baseDir,
    absolute: true,
    nodir: true,
    ignore: defaultIgnore,
  });
  printMatches("Brace expansion for Markdown files", files);
}

/**
 * 5- Follow symlinks (if symlink creation succeeded)
 *    follow:true lets the walker traverse the linked directory.
 */
{
  const files = await glob("**/*.js", {
    cwd: baseDir,
    absolute: true,
    nodir: true,
    ignore: defaultIgnore,
    follow: true, // traverse symlinks like link-to-utils -> src/utils
  });
  printMatches("JS with symlink traversal (follow:true)", files);
}

/**
 * 6- Multiple patterns in one call (array form)
 *    Combine patterns for .json and .config.js
 */
{
  const files = await glob(["**/*.json", "**/*.config.js"], {
    cwd: baseDir,
    absolute: true,
    nodir: true,
    ignore: defaultIgnore,
  });
  printMatches("Multiple patterns (.json + .config.js)", files);
}

/**
 * 7- Sync vs Async comparison
 *    In tooling/build steps, sync can be convenient; otherwise prefer async.
 */
{
  const startA = performance.now();
  const asyncFiles = await glob("**/*.js", {
    cwd: baseDir,
    absolute: true,
    nodir: true,
    ignore: defaultIgnore,
  });
  const endA = performance.now();

  const startS = performance.now();
  const syncFiles = globSync("**/*.js", {
    cwd: baseDir,
    absolute: true,
    nodir: true,
    ignore: defaultIgnore,
  });
  const endS = performance.now();

  console.log("\n— Sync vs Async —");
  console.log(`async glob(): ${asyncFiles.length} files in ${(endA - startA).toFixed(2)} ms`);
  console.log(`sync  globSync(): ${syncFiles.length} files in ${(endS - startS).toFixed(2)} ms`);
}

/**
 * 8- Windows path escaping edge case
 *    windowsPathsNoEscape:true treats backslashes as path separators, not escape chars.
 *    Safe to set true for cross-platform CLIs that accept Windows-style paths.
 */
{
  const files = await glob("**/*.js", {
    cwd: baseDir,
    absolute: true,
    nodir: true,
    ignore: defaultIgnore,
    windowsPathsNoEscape: true,
  });
  printMatches("Windows-compatible scanning (windowsPathsNoEscape:true)", files);
}

// Notes:
// - Prefer `ignore` over negated patterns for clarity and performance.
// - `dot:true` is opt-in to avoid accidentally grabbing secrets/configs like `.env`.
// - Use `{ cwd, absolute }` to get stable, reproducible paths across CI and local.
// - `follow:true` is handy for monorepos or linked workspaces but be conscious of cycles.
// - Avoid scanning `node_modules` unless there is a deliberate reason; it’s large.
// - Async `glob()` integrates nicely with other async build steps and I/O.
// - Keep pattern sets small and explicit; broad globs can become a performance hotspot.