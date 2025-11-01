/**
 * Topic: Node.js CLI Utilities → chalk (Terminal String Styling)
 * Purpose: Demonstrates how to style terminal output using colors, backgrounds, bold/underline effects, and RGB/HEX values.
 * Key Points:
 *  - chalk is an ESM-only module for colorizing terminal text (use `import`, not `require`).
 *  - Supports chained styles (bold, underline, background, etc.).
 *  - Supports RGB and HEX color formats for full customization.
 *  - Ideal for improving CLI readability, log differentiation, and error highlighting.
 *  - Can be combined with process.stdout / stderr for low-level control.
 * Run: node src/06-command-line-apps/04-printing-output/02-chalk-package.js
 * Expected:
 *  - Displays various colored, bolded, and styled outputs.
 *  - Demonstrates a simple colored logging utility.
 *  - Prints success and error messages directly via stdout/stderr.
 */

import chalk from 'chalk';

// === Basics ===
console.log(chalk.blue('Hello world!'));
console.log(chalk.red('Error!'));
console.log(chalk.green('Success!'));

// Combined styles
console.log(chalk.bold.red('Important!'));
console.log(chalk.bgYellow.black(' Warning '));
console.log(chalk.underline.blue('Click here'));

// Inline template usage
console.log(`${chalk.green('✔')} Task completed`);

// Concatenated color segments
console.log(
  chalk.green('Everything is fine') + ' ' +
  chalk.yellow('but be careful!') + ' ' +
  chalk.red('Something failed!')
);

// Conditional color output
const isError = true;
console.log(isError ? chalk.red('Error') : chalk.green('OK'));

// RGB / HEX examples
console.log(chalk.rgb(255, 136, 0)('Orange text'));
console.log(chalk.hex('#FF8800')('Same orange text'));
console.log(chalk.bgRgb(15, 100, 204)('Custom background'));

// === Advanced: Custom Log Utility ===
const log = {
  info: (...msg) => console.log(chalk.blue('[INFO]'), ...msg),
  success: (...msg) => console.log(chalk.green('[OK]'), ...msg),
  warn: (...msg) => console.log(chalk.yellow('[WARN]'), ...msg),
  error: (...msg) => console.error(chalk.red('[ERROR]'), ...msg),
};

log.info('Starting process...');
log.success('Process completed successfully.');
log.warn('Low memory detected.');
log.error('Failed to connect to database.');

// === Direct Stream Output ===
process.stdout.write(chalk.green('Operation succeeded!\n'));
process.stderr.write(chalk.red('Operation failed!\n'));