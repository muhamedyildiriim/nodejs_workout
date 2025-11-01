/**
 * Topic: Node.js CLI Utilities → Commander (Professional CLI Argument Handling)
 * Purpose: Demonstrates how to define commands, options, and arguments using Commander.js.
 * Key Points:
 *  - Commander provides automatic help (`-h`) and version flags (`-V`).
 *  - Supports typed arguments, required/optional params, and option flags.
 *  - Automatically generates usage/help text.
 *  - Great for building modular CLI tools.
 * Run: node src/06-command-line-apps/05-command-line-args/02-commander.js
 * Expected:
 *   Displays calculation result in terminal.
 */

import { Command } from 'commander';
const program = new Command();

// === CLI metadata ===
program
  .name('calc')
  .description('Simple calculator CLI using Commander.js')
  .version('1.0.0');

// === Define "add" command ===
program
  .command('add <a> <b>')
  .description('Add two numbers')
  .action((a, b) => {
    console.log(`${a} + ${b} = ${Number(a) + Number(b)}`);
  });

// === Define "sub" command ===
program
  .command('sub <a> <b>')
  .description('Subtract two numbers')
  .action((a, b) => {
    console.log(`${a} - ${b} = ${Number(a) - Number(b)}`);
  });

// === Define "mul" command ===
program
  .command('mul <a> <b>')
  .description('Multiply two numbers')
  .action((a, b) => {
    console.log(`${a} × ${b} = ${Number(a) * Number(b)}`);
  });

// === Define "div" command ===
program
  .command('div <a> <b>')
  .description('Divide two numbers')
  .action((a, b) => {
    console.log(`${a} ÷ ${b} = ${Number(a) / Number(b)}`);
  });

// === Parse command-line arguments ===
program.parse(process.argv);