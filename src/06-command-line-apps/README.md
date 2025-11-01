# Command-Line Apps

**Goal:** Master how Node.js powers command-line applications — from handling process lifecycle and environment variables to managing user input/output and advanced argument parsing with external libraries.

## Structure
- `01-exitting-exit-codes/` – gracefully end processes and understand exit codes:
  - `process.exit()`
  - custom exit codes for success/failure
  - error handling before exit
- `02-environment-variables/` – manage runtime configuration:
  - use `.env` files via `dotenv`
  - load and override variables safely
  - differentiate between development and production environments
- `03-taking-input/` – handle user input interactively:
  - `process.stdin` basics
  - `inquirer` and `prompts` for rich CLI interactions
  - validate and sanitize user input
- `04-printing-output/` – enhance terminal output:
  - colorize text with `chalk`
  - generate ASCII art using `figlet`
  - show progress bars with `cli-progress`
  - log to `stdout` and `stderr` effectively
- `05-command-line-args/` – parse and process CLI arguments:
  - manual parsing with `process.argv`
  - structured command creation using `commander`

## Key Takeaways
- `process.exit(code)` defines how the Node.js process terminates (0 = success, non-zero = error).  
- `.env` files keep sensitive credentials out of your source and enable easy configuration switching.  
- Use `inquirer` or `prompts` to build interactive, user-friendly CLI tools.  
- `chalk`, `figlet`, and `cli-progress` help make command-line apps **visual**, **fun**, and **clear**.  
- `commander` provides structured argument parsing and built-in help/version support.  
- Combine these features to build **production-ready CLI utilities** with robust input/output handling.

## How to Run
Each script is standalone:
```bash
node src/06-command-line-apps/03-taking-input/02-inquirer.js