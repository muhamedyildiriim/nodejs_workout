/**
 * File: 02-esm/03-logger-basic.mjs
 * Topic: ECMAScript Modules → Basic Named Exports
 * Purpose: Demonstrate exporting multiple functions and constants using ESM syntax.
 * Key Points:
 *  - Named exports improve clarity and support selective imports.
 *  - ESM uses static structure; imports are resolved at load time.
 *  - Works seamlessly with modern bundlers and tree-shaking.
 * Run: node src/02-modules/02-esm/03-logger-basic.mjs
 * Expected:
 *  - Provides logInfo(), logError(), and myDefaultMessage for imports.
 */

import chalk from "chalk";

// Exporting multiple named members using ESM syntax
export function logInfo(message) {
  console.log(chalk.blue(message));
}

export function logError(message) {
  console.log(chalk.red(message));
}

export const myDefaultMessage = "Hello World";