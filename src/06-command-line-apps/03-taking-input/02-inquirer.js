/**
 * Topic: Node.js CLI Utilities → Inquirer.js (Multi-step Interactive Prompt)
 * Purpose: Demonstrates how to build an interactive CLI questionnaire with multiple question types — input, number, confirm, and list selection.
 * Key Points:
 *  - Inquirer provides structured, asynchronous prompts for user interaction.
 *  - Supports input validation, lists, confirmations, and numeric fields.
 *  - Useful for setup wizards, scaffolding tools, and configuration assistants.
 *  - Returns an object containing all user responses.
 * Run: node src/06-command-line-apps/03-taking-input/02-inquirer.js
 * Expected:
 *  - Asks for username, age, confirmation, and preferred framework.
 *  - Displays all collected answers.
 */

import inquirer from 'inquirer';

const answers = await inquirer.prompt([
  { 
    name: 'username', 
    message: 'What is your username?' 
  },
  { 
    name: 'age', 
    message: 'How old are you?', 
    type: 'number' 
  },
  { 
    name: 'confirm', 
    message: 'Do you want to continue?', 
    type: 'confirm' 
  },
  { 
    type: 'list',
    name: 'framework',
    message: 'Which framework would you like to work with?',
    choices: ['React', 'Vue', 'Svelte']
  }
]);

console.log('\n✅ Collected Answers:');
console.log(answers);

// Access individual values if needed:
console.log(`\nHello ${answers.username}, you chose ${answers.framework}!`);
