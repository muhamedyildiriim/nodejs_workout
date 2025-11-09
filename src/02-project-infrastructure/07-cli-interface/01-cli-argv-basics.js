/**
 * File: /02-project-infrastructure/07-cli-interface/01-cli-argv-basics.js
 * Topic: Project Infrastructure → CLI Interface → `process.argv` (The "Raw" Way)
 * Purpose: Demonstrates the "raw", "brittle" way of reading command-line arguments using the `process.argv` global.
 *
 * Key Points:
 * - `process.argv`: An array containing all command-line arguments.
 * - `argv[0]`: The `node` executable path.
 * - `argv[1]`: The path to the script file being run.
 * - `argv[2]+`: The *actual* user-provided arguments.
 * - **"The Problem":** This is "brittle". The developer
 * must manually parse flags, handle order, and check for missing values.
 *
 * Run (Try both!):
 * 1. node src/02-project-infrastructure/07-cli-interface/01-cli-argv-basics.js
 * 2. node src/02-project-infrastructure/07-cli-interface/01-cli-argv-basics.js --mode=production
 *
 * Expected:
 * - Logs the full `process.argv` array.
 * - Logs the "User Arguments" (the slice).
 * - Correctly finds the mode (or logs "Mode not specified").
 */

// 1. The full `process.argv` array
console.log("Full `process.argv` array:");
console.log(process.argv);

// 2. The user-provided arguments
// We slice off the first two, which are just 'node' and the script path.
const args = process.argv.slice(2);
console.log("\nUser Arguments (process.argv.slice(2)):");
console.log(args);

// 3. The "Brittle" "Phase 1" parsing logic
// We have to manually loop and check for our flag.
console.log("\n--- Manual (Brittle) Parsing ---");
let mode = "development"; // default
for (const arg of args) {
  if (arg.startsWith("--mode=")) {
    mode = arg.split("=")[1];
    break;
  }
}
console.log(`Application Mode: ${mode}`);

// Notes:
// - This is simple, but it is "brittle".
// - What if the user types `--Mode` or `-m`?
// - What about a `--help` flag?
// - This is why we use `commander`.