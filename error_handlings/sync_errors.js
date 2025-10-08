// ============================================
// ============ SYNCHRONOUS ERROR =============
// ============================================

/*
These occur immediately during code execution — usually logic or reference errors.

Common Causes:

- Invalid variable reference (ReferenceError)
- Type mismatches (TypeError)
- Invalid operations (RangeError, SyntaxError)
*/

try {
  let x = y + 5; // ReferenceError: y is not defined
  console.log("This line won't run");
} catch (err) {
  console.error("Caught a synchronous error:", err.message);
}
console.log("Program continues...");

/*
How to handle: Wrap risky code in try...catch.
When it appears: Immediately during synchronous execution.
*/