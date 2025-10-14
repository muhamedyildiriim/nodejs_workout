/**
 * Topic: Error Handling → Core Concepts → System Errors
 * Purpose: Demonstrates how Node.js surfaces operating system-level errors (e.g., file or network failures).
 * Key Points:
 *  - System errors originate from the OS and include an error code (e.g., ENOENT, ECONNREFUSED)
 *  - Common in fs, net, http, and dns modules
 *  - Always inspect err.code to identify the exact failure reason
 * Run: node src/03-error-handlings/01-core-concepts/errors/02-system-errors.js   (Node >= 20)
 * Expected:
 *  - Logs: "System Error: ENOENT" when attempting to read a non-existent file
 */

import fs from "fs/promises";

try {
  // Attempt to read a file that doesn’t exist → triggers a System Error from the OS
  await fs.readFile("olmayan_dosya.txt", "utf8");
} catch (err) {
  console.log("System Error:", err.code); // ENOENT (Error NO ENTry)
}

// Notes:
// - System errors are thrown by Node’s core modules (fs, net, http, etc.).
// - err.code provides the OS-level error identifier.
// - Always log both err.code and err.message for debugging production issues.