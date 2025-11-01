/**
 * Topic: Node.js CLI Utilities → prompts (Async Interactive Prompts)
 * Purpose: Demonstrates how to collect user credentials (email, password, API token) using the lightweight `prompts` library.
 * Key Points:
 *  - `prompts` provides a minimal, promise-based interface for user input in CLI.
 *  - Supports prompt types such as text, password, number, confirm, select, etc.
 *  - Returns responses as an object (e.g., `{ email, password, token }`).
 *  - Validation functions can return `true` or an error message string.
 *  - Ideal for login flows, token entry, and quick configuration steps.
 * Run: node src/06-command-line-apps/03-taking-input/03-prompts.js
 * Expected:
 *  - Asks for email, password, and API token.
 *  - Validates token length before accepting.
 *  - Logs all collected responses to the console.
 */

import prompts from 'prompts';

// Ask for email and password
const credentials = await prompts([
  { type: 'text', name: 'email', message: 'What is your email address?' },
  { type: 'password', name: 'password', message: 'Enter your password:' },
]);

// Ask for API token with validation
const tokenResponse = await prompts({
  type: 'password',
  name: 'token',
  message: 'Enter your API token:',
  validate: value => value.length > 5 ? true : 'Token must be at least 6 characters long'
});

// Combine all responses
const userData = { ...credentials, ...tokenResponse };

console.log('\n✅ Collected Responses:');
console.log(userData);