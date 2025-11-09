/**
 * File: /02-project-infrastructure/02-globals-and-buffers/01-global-scope.js
 * Topic: Project Infrastructure → Globals → The `global` Object
 * Purpose: Demonstrates the Node.js `global` object, which contains
 * all "globally available" utilities.
 *
 * Key Points:
 * - `global`: The global namespace object in Node.js (like `window` in browsers).
 * - Built-in utilities like `console`, `setTimeout`, `setInterval`,
 * `process`, and `Buffer` are all properties of `global`.
 * - **The "Architect's Rule":** DO NOT pollute the global scope
 * (e.g., `global.myVar = '...'`). This is "bad architecture"
 * and creates hard-to-debug "side effects".
 * - Use Modules (CJS/ESM) to share code instead.
 *
 * Run: node src/02-project-infrastructure/02-globals-and-buffers/01-global-scope.js
 * Expected:
 * - Logs `true` (proving `process` is a global).
 * - Logs the "polluted" variable.
 */

// 1. Built-in globals
// We can call `console.log()` because `global.console.log()` exists.
// We can access `process` because `global.process` exists.
console.log(
  "Is `process` the same as `global.process`?",
  process === global.process
);

// 2. The "Sin": Polluting the global scope
// This is an "anti-pattern" in modern Node.js development.
global.myBadVariable = "I am polluting the global scope!";

// This variable is now available in *every other module* in this
// entire application, even if they don't import it.
console.log(
  "Reading the 'polluted' variable:",
  global.myBadVariable
);

// Notes:
// - Relying on globals makes code "brittle" and hard to test.
// - Always `import` or `require` your dependencies explicitly.