/**
 * Topic: Node.js Core → process.stdout / process.stderr (Standard Output & Error)
 * Purpose: Demonstrates how Node.js handles output and error streams for logging, redirection, and child process communication.
 * Key Points:
 *  - process.stdout: a writable stream for standard output (e.g., console.log).
 *  - process.stderr: a writable stream for errors and diagnostics (e.g., console.error).
 *  - Useful for redirecting logs, separating normal and error messages, or piping output in CLI tools.
 *  - The console.Console class allows custom redirection of stdout and stderr to files or streams.
 *  - Child processes (via spawn) expose their own stdout and stderr for process-level communication.
 * Run: node src/06-command-line-apps/04-printing-output/01-stdout-stderr.js
 * Expected:
 *  - Prints basic stdout and stderr messages to terminal.
 *  - Writes log messages to out.log and err.log files.
 *  - Spawns a child process (`ls -lh /`) and captures its stdout and stderr output.
 */

// === Basics ===
process.stdout.write("Hello, world!\n");
process.stderr.write("Something went wrong!\n");

// === Advanced: Redirect stdout/stderr to files ===
import fs from "fs";

const output = fs.createWriteStream("./out.log");
const errorOutput = fs.createWriteStream("./err.log");

// Create a custom console instance that writes to the files
const logger = new console.Console({ stdout: output, stderr: errorOutput });

logger.log("This is a normal log message.");
logger.error("This is an error message.");

// === Advanced: Capturing stdout/stderr from a child process ===
import { spawn } from "child_process";

const child = spawn("ls", ["-lh", "/"]);

child.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});