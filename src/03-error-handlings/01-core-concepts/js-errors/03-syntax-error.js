/**
 * Topic: Error Handling → JS Errors → SyntaxError
 * Purpose: Demonstrates SyntaxError via dynamic parsing (since static code would fail to load).
 * Key Points:
 *  - Syntax errors are thrown at parse/compile time
 *  - Use Function constructor or vm to catch them safely at runtime
 * Run: node src/03-error-handlings/01-core-concepts/js-errors/03-syntax-error.js
 * Expected:
 *  - Logs: "SyntaxError caught: Unexpected token ';' ..."
 */

try {
  // Static `const x = ;` would prevent the file from running.
  // Using Function constructor to trigger and catch at runtime:
  // eslint-disable-next-line no-new-func
  new Function("const x = ;")(); // SyntaxError
} catch (err) {
  console.error("SyntaxError caught:", err.message);
}