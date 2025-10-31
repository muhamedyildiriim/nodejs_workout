# Files & Paths

**Goal:** Master how Node.js handles files, paths, and directories — from core path resolution and filesystem I/O to higher-level abstractions, pattern matching, and live file watching.

## Structure
- `01-dirname-filename/` – `__dirname`, `__filename`, and `import.meta.url` in CommonJS vs ESM.
- `02-process-cwd/` – difference between `process.cwd()` and module paths.
- `03-path-module/` – `path.join`, `resolve`, `basename`, `extname`, `normalize` for cross-platform safety.
- `04-fs-module/` – core `fs` API:
  - basic read/write
  - `fs.promises` async usage
  - streams and backpressure
- `05-glob-globby/` – file pattern matching using `glob` and `globby`:
  - include/exclude rules
  - async matching for large directories
- `06-fs-extra/` – higher-level utilities with `fs-extra`:
  - `ensureDir`, `readJson`, `writeJson`, `copy`, `move`, `emptyDir`
  - practical backup and log-cleanup examples
- `07-chokidar/` – file watching and automation:
  - detect `add`, `change`, `unlink`
  - trigger rebuilds via `child_process.exec`

## Key Takeaways
- CommonJS provides `__dirname` and `__filename`; ESM requires recreating them with  
  `fileURLToPath(import.meta.url)`.
- `process.cwd()` returns the **working directory**, not necessarily the module’s directory.
- Always build paths safely using `path.join()` or `path.resolve()` — avoid manual string concatenation.
- `fs.promises` offers modern async file handling; **streams** are essential for large files.
- Use `fs-extra` for safe, cross-platform file operations and clean directory management.
- `glob` and `globby` help you target files dynamically with include/exclude patterns.
- `chokidar` enables real-time monitoring and can trigger automation tasks (e.g., rebuilds, backups).

## How to Run
Each example is standalone:
```bash
node path/to/file.js