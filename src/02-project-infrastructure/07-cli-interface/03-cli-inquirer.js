/**
 * File: /02-project-infrastructure/07-cli-interface/03-cli-inquirer.js
 * Topic: Project Infrastructure → CLI Interface → `inquirer` (Interactive)
 * Purpose: Demonstrates the way to ask *interactive* questions, replacing "raw" `process.stdin`.
 *
 * Key Points:
 * - `inquirer` (or `prompts`): Used to create user-friendly,
 * interactive prompts (questions).
 * - It handles validation, password masking, lists, confirmations, etc.
 * - This is the standard for "scaffolding" tools (e.g., `create-react-app`, `npm init`).
 *
 * Install: npm install inquirer
 *
 * Run:
 * 1. node src/02-project-infrastructure/07-cli-interface/03-cli-inquirer.js
 * 2. (Answer the questions in the terminal)
 *
 * Expected:
 * - An interactive prompt will ask for username, password, and confirmation.
 * - The final answers will be printed as an object.
 */

// Inquirer v9+ is ESM-only, so we use `import`
import inquirer from "inquirer";

console.log("--- 'Architect's' (Mimar) Interactive CLI ---");
console.log("Please answer the following questions:");

// 1. Define the questions
const questions = [
  {
    type: "input",
    name: "username",
    message: "What is your username?",
    validate: (input) => (input ? true : "Username is required."),
  },
  {
    type: "password",
    name: "password",
    message: "Enter a password:",
    mask: "*", // Hides the input
  },
  {
    type: "list",
    name: "template",
    message: "Which template do you want to use?",
    choices: ["React", "Vue", "Angular"],
    default: "React",
  },
  {
    type: "confirm",
    name: "isReady",
    message: "Are you ready to proceed?",
    default: true,
  },
];

// 2. Run the prompt
(async () => {
  try {
    const answers = await inquirer.prompt(questions);

    console.log("\n--- Configuration Complete ---");
    // We *never* log the password.
    delete answers.password;
    console.log("Your answers:", answers);

    if (answers.isReady) {
      console.log("Deploying project...");
    } else {
      console.log("Aborting.");
    }
  } catch (error) {
    console.error("An error occurred with inquirer:", error.message);
  }
})();