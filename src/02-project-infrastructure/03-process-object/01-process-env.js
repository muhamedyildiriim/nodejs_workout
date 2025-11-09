/**
 * File: /02-project-infrastructure/03-process-object/01-process-env.js
 * Topic: Project Infrastructure → `process` Object → Environment Variables
 * Purpose: Demonstrates the way to handle "secrets" and "configuration" using `process.env`.
 *
 * Key Points:
 * - `process.env`: A global object populated by the Operating System (OS).
 * - **NEVER** hard-code secrets (API keys, DB passwords) in your code.
 * - `dotenv` package: A development tool that loads variables from a
 * `.env` file into `process.env`.
 * - **In Production (e.g., Heroku, AWS):** `dotenv` is *not* used. The platform
 * sets `process.env` variables directly.
 * - `NODE_ENV`: The most common variable, used to check if the
 * app is in 'production' or 'development' mode.
 *
 * How to Run:
 * 1. Create a file named `.env` *in the project root* (next to package.json)
 * 2. Add this line to the `.env` file: `MY_SECRET_KEY="12345-abcde"`
 * 3. Run: node src/02-project-infrastructure/03-process-object/01-process-env.js
 * 4. Run again (in "production"):
 * NODE_ENV=production node src/02-project-infrastructure/03-process-object/01-process-env.js
 *
 * Expected:
 * - Logs the secret key loaded from the `.env` file.
 * - Logs the current `NODE_ENV` mode.
 */

// In a real application, you would `npm install dotenv`
// We simulate it here by checking if it's installed.
try {
  // `dotenv` loads variables from the *root* .env file into `process.env`
  (await import("dotenv")).config();
} catch (e) {
  console.warn(
    "dotenv package not found. Skipping .env file load. (This is normal in production)"
  );
}

// 1. Reading the "Mode"
const isProduction = process.env.NODE_ENV === "production";

console.log(`--- Running in ${isProduction ? "PRODUCTION" : "DEVELOPMENT"} mode ---`);
if (isProduction) {
  console.log("Analytics: Enabled (Production Mode)");
  // e.g., connect to production database
} else {
  console.log("Debug Logging: Enabled (Development Mode)");
  // e.g., connect to local test database
}

// 2. Reading "Secrets"
const apiKey = process.env.MY_SECRET_KEY;

if (apiKey) {
  console.log("MY_SECRET_KEY loaded successfully.");
  // console.log(`(First 5 chars: ${apiKey.substring(0, 5)}...)`);
} else {
  console.error(
    "ERROR: MY_SECRET_KEY is not defined in your .env file or environment!"
  );
}

// Notes:
// - Your `.env` file MUST be in your `.gitignore` file.
// - This is the *only* professional way to manage secrets.