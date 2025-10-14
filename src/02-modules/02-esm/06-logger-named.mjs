/**
 * File: 02-esm/06-logger-named.mjs
 * Topic: ECMAScript Modules → Named Exports & Aliasing
 * Purpose: Demonstrate explicit named exports with function aliasing, equivalent to CommonJS `module.exports`.
 * Key Points:
 *  - ESM replaces `module.exports` with static named exports.
 *  - Use aliasing (`as`) for consistent API naming across module systems.
 *  - Named exports improve clarity, tooling support, and tree-shaking.
 * Run: node src/02-modules/02-esm/06-logger-named.mjs
 * Expected:
 *  - Exports logInfo(), logError(), and oneDefaultMessage for selective imports.
 */

import chalk from "chalk";

function infoESM(message) {
  console.log(chalk.blue(message));
}

function errorESM(message) {
  console.log(chalk.red(message));
}

export const oneDefaultMessage = "Hello World";

// Named exports with aliasing
export { infoESM as logInfo, errorESM as logError };