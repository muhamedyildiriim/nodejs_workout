/**
 * File: /02-project-infrastructure/01-modules-cjs-vs-esm/01-commonjs-module.cjs
 * Topic: Project Infrastructure → Modules → CommonJS (CJS)
 * Purpose: Demonstrates the "Classic" Node.js module system (CommonJS).
 * Key Points:
 * - `require`: The function used to *import* a module. It's synchronous.
 * - `module.exports`: The object used to *export* values from a module.
 * - This is the legacy system Node.js started with.
 * - `.cjs` extension explicitly tells Node to treat this file as CommonJS.
 * Run: node src/02-project-infrastructure/01-modules-cjs-vs-esm/01-commonjs-module.cjs
 * Expected:
 * - Logs the content of the `logger.cjs` utility.
 * - Logs "Logger (CJS) ran 1 time(s)."
 * - Logs "Logger (CJS) ran 2 time(s)."
 */

// We import the logger utility using `require`
const logger = require("./lib/logger.cjs");

// We can also import built-in modules
const path = require("node:path");

console.log("Running 01-commonjs-module.cjs");
console.log("Imported logger object:", logger);
console.log(
  "Imported built-in path module (type):",
  typeof path.join
);

// Use the imported logger
logger.log("Logger (CJS) ran 1 time(s).");
logger.log("Logger (CJS) ran 2 time(s).");

// Notes:
// - `require` is synchronous. If `logger.cjs` took 5 seconds to load,
//   it *would block* the Event Loop.
// - Modules are "cached". `require('./lib/logger.cjs')`
//   will only run the code inside `logger.cjs` *once*.