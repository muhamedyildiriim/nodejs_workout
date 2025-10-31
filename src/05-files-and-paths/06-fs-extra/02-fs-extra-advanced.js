/**
 * Topic: Node.js Filesystem Utilities → fs-extra (Log Backup Script)
 * Purpose: Demonstrates how to back up log files from a local logs/ directory
 *          into a backup/ directory with timestamped filenames.
 * Key Points:
 *  - Recreates __dirname in ESM using fileURLToPath(import.meta.url).
 *  - `fs.ensureDir()` creates backup directory if it doesn’t exist.
 *  - `fs.readdir()` lists files inside the logs directory.
 *  - `fs.copy()` safely copies each file with a timestamped name.
 *  - Ideal for periodic backups, archiving log files, or deployment hooks.
 * Run: node src/05-files-and-paths/06-fs-extra/02-fs-extra-advanced.js
 * Expected:
 *  - Reads all files in ./logs.
 *  - Copies them into ./backup with timestamps.
 *  - Prints “✅ Backup complete” when finished.
 */

import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// === Setup ESM-friendly __dirname ===
const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log('Current directory:', __dirname);

// === Define key directories ===
const BACKUP_DIR = path.join(__dirname, 'backup');
const LOG_DIR = path.join(__dirname, 'logs');

console.log('Backup directory:', BACKUP_DIR);
console.log('Log directory:', LOG_DIR);

// === Backup all log files ===
async function backupLogs() {
  try {
    await fs.ensureDir(BACKUP_DIR);

    const files = await fs.readdir(LOG_DIR);
    if (files.length === 0) {
      console.log('⚠️ No log files found to back up.');
      return;
    }

    for (const file of files) {
      const src = path.join(LOG_DIR, file);
      const dest = path.join(BACKUP_DIR, `${Date.now()}-${file}`);
      await fs.copy(src, dest);
    }

    console.log('✅ Backup complete.');
  } catch (err) {
    console.error('❌ Error during backup:', err.message);
  }
}

backupLogs().catch(console.error);