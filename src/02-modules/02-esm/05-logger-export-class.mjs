/**
 * File: 02-esm/05-logger-export-class.mjs
 * Topic: ECMAScript Modules → Named Class Export
 * Purpose: Demonstrate exporting a class by name (not default) to support multiple exports per module.
 * Key Points:
 *  - Named exports scale better for multi-API modules.
 *  - Each import remains a live binding reference.
 *  - Encourages explicit, predictable imports (`import { Logger } from ...`).
 * Run: node src/02-modules/02-esm/05-logger-export-class.mjs
 * Expected:
 *  - Exports a Logger class with static info() and error() methods.
 */

import chalk from "chalk";

// Named class export: allows multiple exports within the same module
export class Logger {
  static defaultMessage = "Hello World";

  static info(message) {
    console.log(chalk.blue(message));
  }

  static error(message) {
    console.log(chalk.red(message));
  }
}