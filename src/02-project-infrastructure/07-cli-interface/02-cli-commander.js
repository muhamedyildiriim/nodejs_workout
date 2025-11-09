/**
 * File: /02-project-infrastructure/07-cli-interface/02-cli-commander.js
 * Topic: Project Infrastructure → CLI Interface → `commander`
 * Purpose: Demonstrates the way to build a "robust" CLI using the `commander` package.
 *
 * Key Points:
 * - `commander`: The *de facto* standard for building CLIs in Node.js.
 * - It *replaces* manual `process.argv` parsing.
 * - It *automatically* provides `--help` and `-V` (version) flags.
 * - It handles type coercion (e.g., `<number>`), defaults, and required args.
 *
 * Install: npm install commander
 *
 * Run (Try all!):
 * 1. node src/02-project-infrastructure/07-cli-interface/02-cli-commander.js
 * 2. node src/02-project-infrastructure/07-cli-interface/02-cli-commander.js -p 8080 -m production
 * 3. node src/02-project-infrastructure/07-cli-interface/02-cli-commander.js --help
 * 4. node src/02-project-infrastructure/07-cli-interface/02-cli-commander.js -V
 *
 * Expected:
 * - Each run will parse the options correctly or show the help/version.
 */

import { Command } from "commander";

// 1. Initialize the program
const program = new Command();

// 2. Define the "API" for our CLI tool
program
  .version("1.0.0")
  .description("An example CLI tool")
  .option(
    "-m, --mode <type>",
    "Specify the runtime mode (e.g., 'development' or 'production')",
    "development" // Default value
  )
  .option(
    "-p, --port <number>",
    "Specify the port number to run on",
    "3000" // Default value
  )
  .requiredOption("-f, --file <path>", "Specify the path to a required file");

// 3. Parse the *actual* arguments from `process.argv` `commander` does all the "brittle" work for us.
program.parse(process.argv);

// 4. Get the parsed options
const options = program.opts();

console.log("--- Running 'Architect's' (Mimar) CLI Tool ---");
console.log("Parsed Options:", options);
console.log(`Running in ${options.mode} mode.`);
console.log(`Using port: ${options.port}`);
console.log(`Required file: ${options.file}`);

// Notes:
// - This is "robust". The order of flags doesn't matter.
// - If `options.file` is missing, `commander` will *automatically* show an error and exit.
// - This is the difference-making way to build a CLI.