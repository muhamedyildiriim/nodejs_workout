# 02. Project Infrastructure

**Goal:** Provide a "Masterclass" on the core **Node.js infrastructure**.

This section answers the question: **"How does a Node.js application interact with the 'Outside World'?"**

This "Concept House" covers all the tools required to interact with the **Operating System (OS)**, the **File System (FS)**, **Environment Variables**, and the **Command Line Interface (CLI)**.

---

## Structure

This section is organized by "Concept", merging foundational theory with advanced, "robust" demonstrations.

1.  **`01-modules-cjs-vs-esm/`**
    * **Concept:** Module Systems.
    * **Demonstrates:** The "Classic" (`require`) vs. "Modern" (`import`) module systems and the "trade-offs" between CommonJS and ES Modules.
2.  **`02-globals-and-buffers/`**
    * **Concept:** Global Scope & Binary Data.
    * **Demonstrates:** The `globalThis` object, the "anti-pattern" of "global pollution", and the critical `Buffer` class for handling binary data (the "language" of streams and files).
3.  **`03-process-object/`**
    * **Concept:** The "Process Manager".
    * **Demonstrates:** The `process` global, the tool for interacting with the OS. This includes reading "secrets" (`process.env`), finding the "location" (`process.cwd()`), and ensuring a **"Graceful Shutdown"** (`process.on('SIGINT')`).
4.  **`04-path-module/`**
    * **Concept:** Robust Path Resolution.
    * **Demonstrates:** The *only* professional way to build file paths (`path.join()`) and the solution to the `__dirname` problem in ES Modules (`import.meta.url`).
5.  **`05-fs-module/`**
    * **Concept:** The File System.
    * **Demonstrates:** The "Sin" (`fs.readFileSync`) vs. "Async" (`fs.readFile`) vs. "Scalable" (`fs.createReadStream`) methods for handling files, especially large ones.
6.  **`06-advanced-fs-tools/`**
    * **Concept:** Professional File System Utilities.
    * **Demonstrates:** The tools for "real-world" tasks that are "painful" with the base `fs` module: `fs-extra` (recursive copy/delete), `globby` (pattern matching), and `chokidar` (robust file watching).
7.  **`07-cli-interface/`**
    * **Concept:** Creating Developer Tools.
    * **Demonstrates:** The tools (`commander`, `inquirer`) for building "robust" and "user-friendly", "scaffolding" scripts and automation tools for the development team.

---

## Key Takeaways (The Answers)

* **Infrastructure is about Robustness:** This entire section is about writing code that doesn't "break" when moved from a Mac to a Windows server (`path.join`) or when a file path is unexpected (`import.meta.url`).
* **Manage Secrets Securely:** `process.env` is the "gateway" for all "secrets".
* **Handle Large Files with Streams:** `fs.readFile` is a "sin" for large files; `fs.createReadStream` is the "scalable" solution.
* **Build Tools for Your Team:** `commander` and `inquirer` are the tools for ensuring "architectural consistency" across a company.

## How to Run

```bash
# Each "Book" (Konsept Kitabı) contains its own runnable demos:
node src/02-project-infrastructure/03-process-object/03-graceful-shutdown.js

# Some demos require dependencies (e.g., fs-extra, commander, inquirer)
# (Install them with `npm install` before running)
node src/02-project-infrastructure/07-cli-interface/02-cli-commander.js --help