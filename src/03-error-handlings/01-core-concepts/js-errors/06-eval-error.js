/**
 * Topic: Error Handling → JS Errors → EvalError (rare)
 * Purpose: Illustrates the EvalError class for completeness (rarely thrown by engines today).
 * Key Points:
 *  - Modern JS rarely throws EvalError automatically
 *  - You may still throw EvalError to signal specific misuse
 * Run: node src/03-error-handlings/01-core-concepts/js-errors/06-eval-error.js
 * Expected:
 *  - Logs: "EvalError caught: Avoid using eval in modern code"
 */

try {
  // Modern engines seldom emit EvalError by themselves.
  // We manually throw to demonstrate the type and handling:
  throw new EvalError("Avoid using eval in modern code");
} catch (err) {
  console.error("EvalError caught:", err.message);
}