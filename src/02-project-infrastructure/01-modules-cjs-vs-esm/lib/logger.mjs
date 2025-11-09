/**
 * File: /02-project-infrastructure/01-modules-cjs-vs-esm/lib/logger.mjs
 * Topic: ES Modules → `export default`
 * Purpose: A utility file demonstrating how to *export* code
 * using the ESM `export` syntax.
 */

console.log(
  "--- logger.mjs file is executing (This should only log ONCE) ---"
);

class Logger {
  constructor() {
    this.count = 0;
  }

  log(message) {
    this.count++;
    console.log(`[Logger ESM]: (${this.count}) ${message}`);
  }
}

// We export a *single instance* (singleton) of the Logger class
// using the `export default` syntax.
export default new Logger();

// You could also export "named" exports:
// export const log = (msg) => console.log(msg);
// export const foo = () => 'bar';
// (These would be imported using `{ log, foo }` syntax).