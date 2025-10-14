/**
 * File: 01-commonjs/04-logger-class.cjs
 * Topic: CommonJS → Exporting Classes
 * Purpose: Demonstrate exporting a class instead of plain objects or functions.
 * Key Points:
 *  - CommonJS modules can export a single class using `module.exports`.
 *  - Consumers can import and call static methods directly.
 *  - Class-based exports help encapsulate logic and maintain structure.
 * Run: node src/02-modules/01-commonjs/04-logger-class.cjs
 * Expected:
 *  - The Logger class prints blue and red messages using static methods.
 */

const chalk = require("chalk");

class Logger {
  static defaultMessage = "Hello World";

  static info(message) {
    console.log(chalk.blue(message));
  }

  static error(message) {
    console.log(chalk.red(message));
  }
}

// Exporting the class as the module itself
module.exports = Logger;