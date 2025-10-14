/**
 * Topic: Error Handling → Categories → Programmer Errors
 * Purpose: Demonstrates errors caused by developer mistakes or logic flaws — not external conditions.
 * Key Points:
 *  - Programmer errors should crash or be fixed, not handled silently
 *  - Typical examples: null references, invalid logic, wrong API usage
 *  - Use assertions and input validation to prevent them
 * Run: node src/03-error-handlings/02-categories/01-programmer-error.js
 * Expected:
 *  - Logs: "Programmer error: Cannot divide by zero"
 */

function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}

try {
  divide(10, 0);
} catch (err) {
  console.error("Programmer error:", err.message);
}

// Notes:
// - These errors indicate flaws in your code logic.
// - Fix the code instead of suppressing or retrying.
// - Use linting, static typing, and tests to catch them early.
