/**
 * File: /02-project-infrastructure/04-process-object/02-process-argv-cwd.js
 * Topic: Project Infrastructure → `process` Object → `argv` and `cwd`
 * Purpose: Demonstrates how Node.js gets its "location" (`cwd`) and
 * "arguments" (`argv`) from the command line.
 *
 * Key Points:
 * - `process.argv`: An array of all command-line arguments.
 * - `argv[0]`: The `node` executable path.
 * - `argv[1]`: The path to the script file being run.
 * - `argv[2]+`: The *actual* user-provided arguments.
 * - `process.cwd()`: "Current Working Directory". This is *where you
 * ran the `node` command from* (the "Restaurant Address").
 * - This is *different* from `__dirname` (which is where the *file lives*).
 *
 * Run (Try both!):
 * 1. (From root):
 * node src/02-project-infrastructure/04-process-object/02-process-argv-cwd.js dev 123
 * 2. (From inside):
 * cd src/02-project-infrastructure/04-process-object/
 * node 02-process-argv-cwd.js test 456
 *
 * Expected:
 * - `process.cwd()` will be *different* in both runs.
 * - `process.argv` will show the arguments 'dev', '123' or 'test', '456'.
 */

// 1. process.cwd() - The "Restaurant Address"
console.log(`Current Working Directory (process.cwd()):`);
console.log(process.cwd());
console.log("---");

// 2. process.argv - The "Special Orders"
console.log("Command Line Arguments (process.argv):");
process.argv.forEach((arg, index) => {
  console.log(`  [${index}]: ${arg}`);
});

// The way to parse user arguments (We slice off the first two, which are just 'node' and the script path)
const userArgs = process.argv.slice(2);
console.log("User-provided arguments (argv.slice(2)):", userArgs);

if (userArgs.length > 0) {
  console.log(`First argument (command): ${userArgs[0]}`);
}

// Notes:
// - `process.cwd()` is used by `path.resolve()` to create absolute paths.
// - `process.argv` is the raw "Alet" (Tool). For complex CLIs, use packages like `commander` (which we will see in the `05-cli-interface` section).