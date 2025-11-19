/**
 * File: /04-advanced-patterns-and-scaling/03-error-handling/01-error-types-and-custom.js
 * Topic: Advanced Patterns → Error Handling → Custom Error Classes
 * Purpose: Demonstrates the built-in Error types and the difference-making pattern: **Custom Error Classes**.
 *
 * Key Points:
 * - `ReferenceError`, `TypeError`, `RangeError`: "Programmer Errors". These should *not* be handled gracefully; they should be *fixed*.
 * - **The Solution:** `class AppError extends Error`.
 * - We create *our own* "Operational Error" class.
 * - This allows us to "classify" errors. We can check `if (error instanceof AppError)` to know if it's a "safe" erro to send to the client (e.g., "User Not Found").
 *
 * Run: node src/04-advanced-patterns-and-scaling/03-error-handling/01-error-types-and-custom.js
 * Expected:
 * - "Caught a TypeError!"
 * - "Caught an AppError (Operational): User not found"
 */

// --- 1. The Custom Error Class ---
// This is the *most important* tool in this section.
// We create our own error "type" to distinguish "safe"
// operational errors from "unsafe" programmer errors.
class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Pass the message to the base `Error` class
    this.name = "AppError"; // Custom name
    this.statusCode = statusCode; // e.g., 404, 400, 401
    this.isOperational = true; // We *know* this error is safe to handle

    // Maintain a proper stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

// --- 2. Catching a "Programmer Error" (e.g., TypeError) ---
try {
  const a = null;
  a.toString(); // This will throw a TypeError
} catch (error) {
  console.log("--- 1. Caught a Programmer Error ---");
  console.log(`Caught a ${error.name}!`); // "TypeError"
  // In a real app, we would *not* send this `error.message`
  // to the client. We would just log it and crash.
}

// --- 3. Catching an "Operational Error" (Our `AppError`) ---
function findUser(id) {
  if (id !== 1) {
    // We *throw* our *custom* error.
    throw new AppError("User not found", 404);
  }
  return { id: 1, name: "Test User" };
}

try {
  const user = findUser(2); // This will throw our AppError
} catch (error) {
  console.log("\n--- 2. Caught an Operational Error ---");
  // This is the "difference-making" check:
  if (error instanceof AppError) {
    console.log(
      `Caught an AppError (Operational): ${error.message}`
    );
    // This message (`error.message`) is *safe* to send to the client.
    // res.status(error.statusCode).json({ error: error.message });
  } else {
    // This is an *unknown*, "unsafe" error
    console.error("Caught an unknown error:", error);
    // res.status(500).json({ error: "Internal server error" });
  }
}

// Notes:
// - `AppError` allows us to "classify" our errors.
// - This is the key to "robust" error handling.