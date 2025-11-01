/**
 * Topic: Node.js + dotenv → Loading Database Configuration (ESM)
 * Purpose: Demonstrates how to load database connection info (DB_URL) from an environment file and handle missing variables safely.
 * Key Points:
 *  - Recreates `__dirname` in ES modules using `fileURLToPath(import.meta.url)`.
 *  - Uses `dotenv.config({ path })` to load variables from a custom `.env` file path.
 *  - Validates the presence of `DB_URL` and throws an error if it’s missing.
 *  - Prevents runtime connection attempts without required credentials.
 * Run: node src/06-command-line-apps/02-environment-variables/02-dotenv-advanced.js
 * Expected:
 *  - Loads environment variables from `data_production.env`.
 *  - If `DB_URL` exists → logs the connection message.
 *  - If missing → throws “DB_URL missing!” error.
 */

import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Recreate __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define explicit .env file path
const DB_URL_PATH = path.join(__dirname, 'data_production.env');

// Load environment variables
dotenv.config({ path: DB_URL_PATH });

// Validate required variable
const DB = process.env.DB_URL;
if (!DB) throw new Error("DB_URL missing!");

// Log success
console.log(`DB'ye bağlanılıyor: ${DB}`);