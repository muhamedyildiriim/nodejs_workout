/**
 * Topic: Node.js → globby (Advanced Patterns, Streams, gitignore, Performance)
 * Purpose: Demonstrates advanced usage of the 'globby' package: ignore rules, .gitignore respect,
 *          brace/extension expansion, stream API, and sync vs async performance.
 * Key Points:
 *  - Prefer async `globby()` in production; `globbySync()` is fine for small build scripts.
 *  - `gitignore: true` automatically excludes files listed in .gitignore.
 *  - `expandDirectories` turns directory names into file-matching patterns (by extension).
 *  - Stream API (`globbyStream`) scales to large trees with low memory footprint.
 * Run: node src/05-files-and-paths/05-glob-globby/04-globby-advanced.js
 * Expected:
 *  - Creates a demo workspace.
 *  - Shows advanced matching, stream consumption, gitignore effects, and perf comparison.
 */

import { globby, globbySync, globbyStream } from "globby";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Recreate __dirname (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("=== GLOBBY (ADVANCED) DEMONSTRATION ===\n");

// 1- Prepare a self-contained demo workspace
const baseDir = path.join(__dirname, "demo-adv");
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
  ensureDir(path.join(baseDir, "dist"));
  ensureDir(path.join(baseDir, "build"));
  ensureDir(path.join(baseDir, "node_modules", "deps"));
  ensureDir(path.join(baseDir, "fixtures"));
  ensureDir(path.join(baseDir, "logs"));
  ensureDir(path.join(baseDir, ".hidden"));

  // Files
  ensureFile(path.join(baseDir, "src", "index.js"), `console.log("hello");\n`);
  ensureFile(path.join(baseDir, "src", "utils", "helper.ts"), `export const sum=(a,b)=>a+b;\n`);
  ensureFile(path.join(baseDir, "src", "tests", "helper.test.ts"), `test("sum",()=>{});\n`);
  ensureFile(path.join(baseDir, "dist", "bundle.js"), `// built asset\n`);
  ensureFile(path.join(baseDir, "build", "artifact.js"), `// build artifact\n`);
  ensureFile(path.join(baseDir, "README.md"), `# Advanced Globby Demo\n`);
  ensureFile(path.join(baseDir, "notes.md"), `Notes...\n`);
  ensureFile(path.join(baseDir, "fixtures", "example.json"), `{"ok":true}\n`);
  ensureFile(path.join(baseDir, "logs", "app.log"), `line 1\n`);
  ensureFile(path.join(baseDir, "package.json"), `{"name":"globby-adv-demo"}\n`);
  ensureFile(path.join(baseDir, ".env"), `SECRET=dev\n`);
  ensureFile(path.join(baseDir, "secret.env"), `TOP_SECRET=yes\n`);
  ensureFile(path.join(baseDir, ".hidden", "dot.md"), `hidden\n`);
  ensureFile(path.join(baseDir, "node_modules", "deps", "index.js"), `module.exports={}\n`);

  // .gitignore to demonstrate gitignore: true
  ensureFile(
    path.join(baseDir, ".gitignore"),
    [
      "dist/",
      "build/",
      "logs/",
      "*.log",
      "secret.env",
      "node_modules/",
      ".hidden/",
    ].join("\n") + "\n"
  );
}

console.log("Base Directory:", baseDir, "\n");

// A shared pretty-printer
function printMatches(label, files) {
  console.log(`\n— ${label} —`);
  if (!files?.length) {
    console.log("→ No matches found.");
    return;
  }
  for (const f of files) console.log(f);
  console.log(`(count: ${files.length})`);
}

// Common options
const common = {
  cwd: baseDir,
  absolute: true,
  onlyFiles: true, // skip directories for most demos
};

// 2- Advanced: expandDirectories (treat "src" as patterns for given extensions)
{
  const files = await globby("src", {
    ...common,
    expandDirectories: {
      extensions: ["js", "ts"], // expands to src/**/*.js and src/**/*.ts
      files: [], // no fixed filenames; pure extension-based expansion
    },
    ignore: ["**/*.test.ts"], // exclude test files
  });
  printMatches("expandDirectories on 'src' (js/ts, excluding tests)", files);
}

// 3- Brace & negation patterns + custom ignore
{
  const files = await globby(["**/*.{md,MD,json}", "!node_modules/**"], {
    ...common,
    // You can still add ignore; globby merges both
    ignore: ["**/dist/**", "**/build/**"],
  });
  printMatches("Brace patterns for {md,MD,json} (minus node_modules, dist, build)", files);
}

// 4- Respect .gitignore (gitignore: true) vs not (gitignore: false)
{
  const withGitignore = await globby(["**/*"], {
    ...common,
    dot: true, // allow dotfiles if not filtered by .gitignore
    gitignore: true, // <— this will exclude dist, build, logs, etc.
  });

  const withoutGitignore = await globby(["**/*"], {
    ...common,
    dot: true,
    gitignore: false,
  });

  printMatches(".gitignore respected (gitignore:true)", withGitignore);
  printMatches(".gitignore NOT respected (gitignore:false)", withoutGitignore);
  console.log(
    `\nDifference (non-negative): ${withoutGitignore.length - withGitignore.length} additional paths when gitignore is OFF`
  );
}

// 5- Include dotfiles intentionally (dot: true)
{
  const files = await globby(["**/*", ".*"], {
    ...common,
    dot: true,
    ignore: ["**/node_modules/**"], // keep results relevant
  });
  // Expect to see .env and files under .hidden/ unless .gitignore excluded them; we disabled gitignore here.
  printMatches("Dotfiles included (dot:true; gitignore disabled)", files);
}

// 6- Stream API: iterate results lazily (useful for huge repos)
{
  console.log("\n— Stream API (first 8 items) —");
  const stream = globbyStream(["**/*.{js,ts,md,json}"], {
    ...common,
    gitignore: true,
  });

  let count = 0;
  for await (const entry of stream) {
    console.log(entry);
    if (++count >= 8) {
      console.log("(…truncated stream output for demo…)");
      break; // stop early for demonstration
    }
  }
}

// 7- Sync vs Async performance comparison
{
  const startA = performance.now();
  const asyncFiles = await globby(["**/*.{js,ts,md,json}"], {
    ...common,
    gitignore: true,
  });
  const endA = performance.now();

  const startS = performance.now();
  const syncFiles = globbySync(["**/*.{js,ts,md,json}"], {
    ...common,
    gitignore: true,
  });
  const endS = performance.now();

  console.log("\n— Sync vs Async —");
  console.log(`async  globby():   ${asyncFiles.length} files in ${(endA - startA).toFixed(2)} ms`);
  console.log(`sync   globbySync(): ${syncFiles.length} files in ${(endS - startS).toFixed(2)} ms`);
}

// Notes:
// - Use `gitignore:true` for developer tooling (linters, formatters) to align with repo hygiene.
// - `expandDirectories` is ergonomic for commands like “scan src for js/ts” without writing **/*.ext patterns.
// - Keep `ignore` explicit and minimal; start with ["**/node_modules/**", "**/dist/**", "**/build/**"].
// - Prefer `{ cwd, absolute, onlyFiles }` for stable, CI-friendly outputs.
// - For very large trees, prefer `globbyStream()` to reduce memory pressure.
// - Consider pre-filtering extensions to avoid broad scans that hurt performance.
// - If you need directories too, set `onlyFiles:false` and optionally `markDirectories:true` (fast-glob option surfaced via globby).