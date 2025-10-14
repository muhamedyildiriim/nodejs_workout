/**
 * File: 01-commonjs/01-index.cjs
 * Topic: CommonJS Orchestrator
 * Purpose: Demonstrate how `require`, `module.exports`, and selective imports work in classic Node.js modules.
 * Key Points:
 *  - CommonJS executes synchronously; modules are cached after first load.
 *  - Supports partial imports and destructuring from `module.exports`.
 *  - Demonstrates interoperability and module caching behavior.
 * Run: node src/02-modules/01-commonjs/01-index.cjs
 * Expected:
 *  - Blue and red log outputs from multiple module styles.
 */

const logger = require("./03-logger-basic.cjs");
const Logger = require("./04-logger-class.cjs");
const { logInfo, defaultMessage } = require("./05-logger-module-exports.cjs");

console.log("=== CommonJS DEMO ===");
logger.logInfo(`${logger.defaultMessage} printed in blue`);
logger.logError("some error message printed in red");

Logger.info(`${Logger.defaultMessage} printed in blue`);
Logger.error("some error message printed in red");

logInfo(`${defaultMessage} printed using module.exports`);

// Demonstrate on-demand module loading
require("./02-import-specific.cjs");

// Extra: Demonstrate caching (the following require won't re-run module code)
const again = require("./03-logger-basic.cjs");
console.log("Is the same instance cached?", logger === again); // true