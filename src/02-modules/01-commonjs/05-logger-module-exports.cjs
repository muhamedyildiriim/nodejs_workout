/**
 * File: 01-commonjs/05-logger-module-exports.cjs
 * Topic: CommonJS → module.exports vs exports
 * Purpose: Demonstrate how `module.exports` replaces the export object to define a custom module interface.
 * Key Points:
 *  - `exports` is a reference to `module.exports` by default.
 *  - Reassigning `module.exports` allows exporting any value or object.
 *  - CommonJS modules return the same cached object instance for subsequent requires.
 * Run: node src/02-modules/01-commonjs/05-logger-module-exports.cjs
 * Expected:
 *  - Exposes logInfo(), logError(), and defaultMessage for external modules.
 */

const chalk = require("chalk");

function info(message) {
  console.log(chalk.blue(message));
}

function error(message) {
  console.log(chalk.red(message));
}

const defaultMessage = "Hello World";

// Exporting custom API through module.exports
module.exports = {
  logInfo: info,
  logError: error,
  defaultMessage,
};