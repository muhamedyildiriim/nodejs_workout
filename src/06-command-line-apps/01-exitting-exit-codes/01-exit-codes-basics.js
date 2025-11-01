/**
 * Topic: Node.js Core → process.exit() and Environment Variables
 * Purpose: Demonstrates how to validate environment variables and terminate a Node.js process gracefully.
 * Key Points:
 *  - process.env: provides access to system and user-defined environment variables.
 *  - process.exit(code): ends the process with an optional exit code.
 *      - 0 → success
 *      - 1 → failure / error
 *  - Commonly used for validation, setup checks, and CLI error handling.
 * Run: node src/06-command-line-apps/01-exitting-exit-codes/01-exit-codes-basics.js
 * Expected:
 *  - If USERNAME is set → ✅ Code executed successfully!
 *  - If USERNAME is missing → ❌ USERNAME environment variable missing! and exits with code 1.
 */

if (!process.env.USERNAME) {
  console.error("❌ USERNAME environment variable missing!");
  process.exit(1); // Exit with error code
}

console.log("✅ Code executed successfully!");
process.exit(0); // Exit normally


/*
process.exit();        // Terminates the program immediately
process.exit(0);       // Successful exit (0 = success)
process.exit(1);       // Error exit (1 = failure)
*/