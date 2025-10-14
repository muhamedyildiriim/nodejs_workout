/**
 * Topic: Error Handling → Categories → Domain Errors
 * Purpose: Demonstrates how the deprecated 'domain' module was used to isolate async errors.
 * Key Points:
 *  - Captures errors within a specific asynchronous execution context
 *  - Deprecated in favor of async/await and async_hooks
 *  - Useful historically, but avoid in modern Node.js
 * Run: node src/03-error-handlings/02-categories/03-domain-error.js
 * Expected:
 *  - Logs: "Domain caught: Error inside domain!"
 */

import domain from "domain";

const d = domain.create();

d.on("error", (err) => {
  console.error("Domain caught:", err.message);
});

d.run(() => {
  throw new Error("Error inside domain!");
});

// Notes:
// - 'domain' is deprecated and should not be used in new code.
// - Modern alternatives: try/catch in async functions, Promise handling, or async_hooks API.