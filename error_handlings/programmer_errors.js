// ============================================
// ============ PROGRAMMER ERRORS =============
// ============================================

// Caused by bad logic, not external issues. Usually should crash or be fixed, not caught silently.

/*
Examples:

- Null reference
- Wrong API usage
- Infinite loop
- Logic bugs
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

/*
How to handle:

- Validate inputs
- Use assertions
- Fix the code logic
*/