/**
 * File: /04-advanced-patterns-and-scaling/03-error-handling/02-programmer-vs-operational.js
 * Topic: Advanced Patterns -> Error Handling -> Programmer vs. Operational
 * Purpose: Demonstrates the critical distinction between "Programmer Errors" (Bugs)
 * and "Operational Errors" (Runtime Issues), and the correct handling strategy for each.
 *
 * Key Points:
 *
 * 1. Programmer Errors (Bugs):
 * - Definition: Mistakes in the code logic itself.
 * - Examples: `ReferenceError` (typo), `TypeError` (reading property of undefined).
 * - Action: CRASH the process.
 * - Why: The application state is now unknown and potentially corrupted.
 * Continuing to run is unsafe. Rely on a Process Manager (like PM2) to restart.
 *
 * 2. Operational Errors (Runtime Issues):
 * - Definition: Expected external failures in a correctly written system.
 * - Examples: "User not found", "Database connection lost", "API Timeout".
 * - Action: RECOVER and Handle.
 * - Why: The logic is sound; the external world just failed.
 * Catch the error, log it, and send a proper response to the client.
 *
 * Run: node src/04-advanced-patterns-and-scaling/03-error-handling/02-programmer-vs-operational.js
 */

console.log("\n--- Node.js Error Handling Philosophy ---\n");

const strategies = {
  PROGRAMMER_ERROR: {
    description: "Bugs in the code (e.g., tried to read a property of 'null').",
    example: "const a = null; a.toString(); // Throws TypeError",
    strategy: "CRASH (Process.exit(1))",
    reasoning:
      "The application is in an undefined state. A clean restart is safer than continuing.",
  },
  OPERATIONAL_ERROR: {
    description: "Runtime failures (e.g., API is down, Input is invalid).",
    example: "throw new AppError('User not found', 404);",
    strategy: "RECOVER (Catch & Respond)",
    reasoning:
      "This is an expected situation. Handle it gracefully without crashing.",
  },
};

// 1. Simulate a Programmer Error Strategy
console.log("1. SCENARIO: Programmer Error Detected");
console.log(`   TYPE: ${strategies.PROGRAMMER_ERROR.description}`);
console.log(`   ACTION: ${strategies.PROGRAMMER_ERROR.strategy}`);
console.log(`   WHY: ${strategies.PROGRAMMER_ERROR.reasoning}`);
console.log("");

// 2. Simulate an Operational Error Strategy
console.log("2. SCENARIO: Operational Error Detected");
console.log(`   TYPE: ${strategies.OPERATIONAL_ERROR.description}`);
console.log(`   ACTION: ${strategies.OPERATIONAL_ERROR.strategy}`);
console.log(`   WHY: ${strategies.OPERATIONAL_ERROR.reasoning}`);
console.log("");

/*
Professional Note:
- In a production environment, distinguishing between these two types is vital.
- We use custom error classes (like `AppError` with an `isOperational: true` property)
  to flag errors that we intend to handle gracefully.
- Any error lacking this flag is treated as a Programmer Error (Crash).
*/