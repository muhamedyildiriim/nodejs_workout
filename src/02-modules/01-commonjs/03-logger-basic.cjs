/**
 * File: 01-commonjs/03-logger-basic.cjs
 * Topic: CommonJS → Basic Module Exports
 * Purpose: Demonstrate how to export multiple members (functions, constants) using `exports`.
 * Key Points:
 *  - CommonJS modules use `exports` or `module.exports` to expose members.
 *  - Each `require()` returns the same cached module instance.
 *  - Prefer clear, named exports for consistency across files.
 * Run: node src/02-modules/01-commonjs/03-logger-basic.cjs
 * Expected:
 *  - Functions `logInfo` and `logError` print colored messages.
 */

const chalk = require("chalk");

// Exporting multiple named members through `exports`
exports.logInfo = function logInfo(message) {
  console.log(chalk.blue(message));
};

exports.logError = function logError(message) {
  console.log(chalk.red(message));
};

exports.defaultMessage = "Hello World";