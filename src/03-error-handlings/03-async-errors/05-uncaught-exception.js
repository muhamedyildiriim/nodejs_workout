/**
 * Topic: Error Handling → Async Errors → Uncaught Exceptions
 * Purpose: Demonstrates how to catch fatal exceptions that escape all try/catch blocks.
 * Key Points:
 *  - Used for last-resort logging before shutdown
 *  - Never continue running after an uncaught exception
 *  - Helps prevent silent crashes in production
 * Run: node src/03-error-handlings/03-async-errors/05-uncaught-exception.js
 * Expected:
 *  - Logs: "Caught at last moment: This error was not caught!"
 *  - Exits process with code 1
 */

process.on("uncaughtException", (err) => {
  console.error("Caught at last moment:", err.message);
  process.exit(1);
});

throw new Error("This error was not caught!");

// Notes:
// - Log and gracefully shut down when this occurs.
// - Indicates a serious bug — do not attempt recovery.
// - Use process managers (PM2, Docker) to restart automatically.