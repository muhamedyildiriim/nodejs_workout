/**
 * Topic: Error Handling → Propagation & Recovery → Error Cause
 * Purpose: Demonstrates the new `cause` option in Node.js Error constructors for chaining error context.
 * Key Points:
 *  - `cause` preserves the original reason when wrapping higher-level errors
 *  - Improves debugging and stack tracing
 *  - Available in Node.js 16.9+ and standardized in ECMAScript 2022
 * Run: node src/03-error-handlings/04-propagation-recovery/01-error-cause.js
 * Expected:
 *  - Logs: "Failed to initialize app" and "Cause: File not found"
 */

function loadConfig() {
  throw new Error("File not found");
}

// Example 1: Direct rethrow with cause
try {
  loadConfig();
} catch (err) {
  throw new Error("Failed to initialize app", { cause: err });
}

// Example 2: Log with chained cause
try {
  loadConfig();
} catch (err) {
  const error = new Error("Failed to initialize app", { cause: err });
  console.error(error.message); // "Failed to initialize app"
  console.error("Cause:", error.cause.message); // "File not found"
}

// Example 3: Custom class with cause support
class AppError extends Error {
  constructor(message, cause) {
    super(message, { cause });
    this.name = "AppError";
  }
}

try {
  loadConfig();
} catch (err) {
  throw new AppError("Failed to initialize app", err);
}

// Notes:
// - The `cause` property is ideal for error chaining (context preservation).
// - Combine it with structured logging for deep debugging visibility.