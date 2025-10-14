/**
 * File: 01-commonjs/02-import-specific.cjs
 * Topic: CommonJS → Selective Imports
 * Purpose: Demonstrate importing only specific members from a CommonJS module.
 * Key Points:
 *  - CommonJS supports selective destructuring from `module.exports`.
 *  - Renaming (aliasing) is allowed during destructuring for clarity.
 *  - Reduces memory footprint and clarifies intent in large modules.
 * Run: node src/02-modules/01-commonjs/02-import-specific.cjs
 * Expected:
 *  - Prints a red error message using only the imported `logError` function.
 */

const { logError: cjsLogError } = require("./05-logger-module-exports.cjs");

cjsLogError("Some error message printed in red (imported selectively)");