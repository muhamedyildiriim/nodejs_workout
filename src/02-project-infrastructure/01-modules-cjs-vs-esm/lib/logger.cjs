/**
 * File: /02-project-infrastructure/01-modules-cjs-vs-esm/lib/logger.cjs
 * Topic: CommonJS → `module.exports`
 * Purpose: A utility file demonstrating how to *export* code
 * using the CommonJS `module.exports` syntax.
 */

console.log(
  "--- logger.cjs file is executing (This should only log ONCE) ---"
);

class Logger {
  constructor() {
    this.count = 0;
  }

  log(message) {
    this.count++;
    console.log(`[Logger CJS]: (${this.count}) ${message}`);
  }
}

// We export a *single instance* (singleton) of the Logger class.
// This is a common pattern for shared utilities.
// Any file that `require`s this will get the *same* instance.
module.exports = new Logger();

// You could also export the class itself:
// module.exports = Logger;