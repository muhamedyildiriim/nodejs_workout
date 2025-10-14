/**
 * Topic: Error Handling → Categories → Custom Errors
 * Purpose: Demonstrates how to define custom error classes for clearer debugging and structured handling.
 * Key Points:
 *  - Custom errors separate application issues from system or logic errors
 *  - Enables type-based handling with instanceof checks
 *  - Improves error consistency and debugging clarity
 * Run: node src/03-error-handlings/02-categories/05-custom-error.js   
 * (Node >= 20)
 * Expected:
 *  - Logs: "AppError: Username is required 400"
 *  - Logs: "ValidationError: Invalid email address"
 */

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

function checkUser(name) {
  if (!name) throw new AppError("Username is required", 400);
  console.log("Welcome,", name);
}

try {
  checkUser(""); // Throws an AppError
} catch (err) {
  if (err instanceof AppError) {
    console.log("AppError:", err.message, err.statusCode);
  } else {
    console.log("Unknown error:", err.message);
  }
}

// Secondary Example: Dedicated subclass for validation errors
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

try {
  throw new ValidationError("Invalid email address");
} catch (err) {
  console.error(`${err.name}: ${err.message}`);
}

// Notes:
// - Create custom errors for predictable, domain-specific handling.
// - Ideal for REST APIs to return structured error responses.
// - Combine with Express middleware or logging utilities for clean control flow.