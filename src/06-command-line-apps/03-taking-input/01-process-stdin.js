/**
 * Topic: Node.js Core → process.stdin / process.stdout (Interactive CLI)
 * Purpose: Demonstrates how to build an interactive terminal program using low-level I/O streams.
 * Key Points:
 *  - process.stdin: a readable stream — receives user input from the terminal.
 *  - process.stdout: a writable stream — sends output to the terminal.
 *  - Always convert Buffer data to string (data.toString()) and trim it to remove newline characters.
 *  - Useful for creating custom CLI prompts without external libraries (like readline or inquirer).
 *  - Demonstrates basic validation, error handling, and graceful exit.
 * Run: node src/06-command-line-apps/03-taking-input/01-process-stdin.js
 * Expected:
 *  - Prompts for user name and age.
 *  - Validates input (non-empty name, numeric age).
 *  - Greets the user and exits cleanly.
 */

process.stdout.write("👋 Hello! Please enter your name: ");

let step = 1;
let user = { name: "", age: null };

process.stdin.on("data", (chunk) => {
  const input = chunk.toString().trim();

  // Step 1 → Name
  if (step === 1) {
    if (!input) {
      process.stderr.write("❌ Name cannot be empty! Please enter again: ");
      return;
    }
    user.name = input;
    step++;
    process.stdout.write("🧮 Now enter your age: ");
    return;
  }

  // Step 2 → Age
  if (step === 2) {
    const ageNum = Number(input);
    if (isNaN(ageNum) || ageNum <= 0) {
      process.stderr.write("⚠️ Invalid age! Please enter a valid number: ");
      return;
    }
    user.age = ageNum;

    // Output
    process.stdout.write(`\n✅ Hello ${user.name}, you are ${user.age} years old!\n`);
    process.stdout.write("Shutting down program gracefully...\n");

    // Clean exit
    process.stdin.pause(); // stops listening for input
    process.exit(0);
  }
});