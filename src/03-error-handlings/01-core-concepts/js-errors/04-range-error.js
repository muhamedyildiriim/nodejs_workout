/**
 * Topic: Error Handling → JS Errors → RangeError
 * Purpose: Shows RangeError when a value violates expected bounds.
 * Key Points:
 *  - Common with string/array sizes or numeric formatting
 *  - Validate inputs before calling APIs like repeat(), toFixed(), new Array()
 * Run: node src/03-error-handlings/01-core-concepts/js-errors/04-range-error.js
 * Expected:
 *  - Logs: "RangeError caught: Invalid count value" (or similar)
 */

function repeatSafe(s, n) {
  return s.repeat(n); // RangeError if n < 0 or too large
}

try {
  repeatSafe("A", -1);
} catch (err) {
  console.error("RangeError caught:", err.message);
}

// Another classic RangeError example:
// try { new Array(-5); } catch (e) { console.error(e.message); }