/**
 * Topic: Error Handling → Propagation & Recovery → Error Propagation
 * Purpose: Demonstrates how errors bubble through multiple function levels until caught.
 * Key Points:
 *  - Errors propagate upward through call stack if not caught
 *  - Intermediate levels can log, wrap, or rethrow
 *  - The top-level function should handle or log final errors
 * Run: node src/03-error-handlings/04-propagation-recovery/02-error-propagation.js
 * Expected:
 *  - Logs:
 *    "Level 2 caught and re-throws..."
 *    "Final Catch: Something broke in Level 3"
 */

function levelThree() {
  throw new Error("Something broke in Level 3");
}

function levelTwo() {
  try {
    levelThree();
  } catch (err) {
    console.log("Level 2 caught and re-throws...");
    throw err; // Bubble upward
  }
}

function levelOne() {
  try {
    levelTwo();
  } catch (err) {
    console.error("Final Catch:", err.message);
  }
}

levelOne();

// Notes:
// - Error propagation helps separate detection (where error occurs) from handling (where it’s best handled).
// - Useful pattern in large modular applications.