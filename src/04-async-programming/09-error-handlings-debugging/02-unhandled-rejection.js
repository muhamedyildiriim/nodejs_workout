/**
 * Topic: Async Programming → Error Handling & Debugging → Global Unhandled Rejections
 * Purpose: Demonstrates capturing Promise rejections that lack .catch handlers at the process level.
 * Key Points:
 *  - Prevents silent failures and increases production observability
 *  - Use as a safety net, not a replacement for local try/catch
 *  - Decide whether to crash or continue based on SLA and reliability policy
 * Run: node src/04-async-programming/09-error-handlings-debugging/02-unhandled-rejection.js
 * Expected:
 *  - Logs: "[Global] Unhandled Rejection: Error: Boom!"
 *  - Sets process.exitCode = 1
 */

process.on("unhandledRejection", (reason) => {
  console.error("[Global] Unhandled Rejection:", reason);
  process.exitCode = 1; // mark process as failed without abrupt exit
});

Promise.reject(new Error("Boom!")); // unhandled → triggers listener

/*
Notes:
- unhandledRejection fires when a Promise is rejected without a catch handler.
- Always prefer local error handling first; this global listener is a last resort.
- Useful for logging, telemetry, or triggering alerts in production.
- Policy decision: crash immediately (process.exit) or mark unhealthy (exitCode).
- Enables structured error pipelines for observability tools (Datadog, Sentry, etc.).
*/