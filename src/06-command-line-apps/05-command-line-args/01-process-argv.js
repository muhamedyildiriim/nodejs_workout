/**
 * Topic: Node.js Core → process.argv (Manual CLI Argument Parsing)
 * Purpose: Demonstrates how to read and handle command-line arguments without external libraries.
 * Run: node src/06-command-line-apps/05-command-line-args/01-process-argv.js
 * Expected: Prints 15
 */

const [,, command, a, b] = process.argv;

if (!command) {
  console.log('Usage: node app.js <add|sub|mul|div> <num1> <num2>');
  process.exit(1);
}

const x = Number(a);
const y = Number(b);

switch (command) {
  case 'add':
    console.log(`${x} + ${y} = ${x + y}`);
    break;
  case 'sub':
    console.log(`${x} - ${y} = ${x - y}`);
    break;
  case 'mul':
    console.log(`${x} × ${y} = ${x * y}`);
    break;
  case 'div':
    console.log(`${x} ÷ ${y} = ${x / y}`);
    break;
  default:
    console.log('Unknown command.');
}