/**
 * Topic: Node.js Core + dotenv → Environment Configuration (ESM)
 * Purpose: Demonstrates how to load environment variables dynamically based on NODE_ENV in an ES module.
 * Key Points:
 *  - ESM (import-based) modules don’t have __dirname by default; recreate it using `fileURLToPath(import.meta.url)`.
 *  - `dotenv.config()` loads environment variables from a specified `.env` file into `process.env`.
 *  - Use different `.env` files (e.g. `.env.development`, `.env.production`) depending on the environment.
 *  - Setting `debug: true` logs details about variable loading.
 * Run: node src/06-command-line-apps/02-environment-variables/01-dotenv-basics.js
 * Expected:
 *  - Prints NODE_ENV (“production” in this example).
 *  - Logs the resolved env file path.
 *  - Loads and prints environment variables (e.g., PORT, API_KEY).
 */

import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Recreate __dirname in ESM context
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Manually set the environment type
process.env.NODE_ENV = 'production';
console.log('NODE_ENV:', process.env.NODE_ENV);

// Dynamically choose the .env file
const envPath =
  process.env.NODE_ENV === 'production'
    ? path.resolve(__dirname, './data_production.env')
    : path.resolve(__dirname, './data_development.env');

console.log('envPath =', envPath);

// Load variables from the chosen .env file
dotenv.config({ path: envPath, debug: true });

console.log('PORT:', process.env.PORT);
console.log('API_KEY:', process.env.API_KEY);