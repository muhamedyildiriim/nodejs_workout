/**
 * File: 02-esm/04-logger-default-class.mjs
 * Topic: ECMAScript Modules → Default Export (Class)
 * Purpose: Demonstrate exporting a single class as the default export in ESM.
 * Key Points:
 *  - Default exports are ideal for single-responsibility modules.
 *  - Static methods enable direct calls without class instantiation.
 *  - Unlike CommonJS, each ESM import gets a live binding reference.
 * Run: node src/02-modules/02-esm/04-logger-default-class.mjs
 * Expected:
 *  - The LoggerESM class logs blue and red messages using static methods.
 */

import chalk from "chalk";

// Exporting a single class as default
export default class LoggerESM {
  static defaultMessage = "Hello World";

  static info(message) {
    console.log(chalk.blue(message));
  }

  static error(message) {
    console.log(chalk.red(message));
  }
}