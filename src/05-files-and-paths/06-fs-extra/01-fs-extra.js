/**
 * Topic: Node.js Filesystem Utilities → fs-extra (Safe File Ops & JSON IO)
 * Purpose: Demonstrates robust directory/file workflows using fs-extra:
 *          create dirs, read/write JSON, copy/move files, and clean folders.
 * Key Points:
 *  - `fs.ensureDir()` safely creates directories (no error if they exist).
 *  - `fs.pathExists()` checks for file existence without throwing.
 *  - `fs.readJson()` / `fs.writeJson()` simplify JSON I/O with pretty-print.
 *  - `fs.copy()` and `fs.move()` handle cross-device copies/moves reliably.
 *  - `fs.emptyDir()` removes contents of a directory without deleting the dir.
 *  - Using absolute paths via `path.resolve()` avoids CWD pitfalls.
 * Run: node src/05-files-and-paths/06-fs-extra/01-fs-extra.js
 * Expected:
 *  - Ensures `data/` and `backup/` exist.
 *  - Creates `data/info.json` if missing, then logs current content.
 *  - Appends a new user, writes back to JSON.
 *  - Copies file to timestamped backup, then moves original to `archived.json`.
 *  - Empties the backup directory.
 */

import fs from 'fs-extra';
import path from 'node:path';

const DATA_DIR = path.resolve('./data');
const BACKUP_DIR = path.resolve('./backup');
const FILE_PATH = path.join(DATA_DIR, 'info.json');

async function runFileManager() {
  try {
    // 1️⃣ Ensure directory structure
    await fs.ensureDir(DATA_DIR);
    await fs.ensureDir(BACKUP_DIR);
    console.log('✅ Directory structure ready.');

    // 2️⃣ Create JSON file if it doesn’t exist
    if (!(await fs.pathExists(FILE_PATH))) {
      await fs.writeJson(FILE_PATH, { users: [] }, { spaces: 2 });
      console.log('🆕 Created info.json.');
    }

    // 3️⃣ Read JSON
    const data = await fs.readJson(FILE_PATH);
    console.log('📄 Current content:', data);

    // 4️⃣ Append a new user
    const newUser = { id: Date.now(), name: 'Mami', country: 'Turkey' };
    data.users.push(newUser);
    await fs.writeJson(FILE_PATH, data, { spaces: 2 });
    console.log('👤 Added user:', newUser);

    // 5️⃣ Copy (backup) with timestamped filename
    const backupPath = path.join(
      BACKUP_DIR,
      `backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
    );
    await fs.copy(FILE_PATH, backupPath);
    console.log('📦 File backed up at:', backupPath);

    // 6️⃣ Move (archive) original JSON
    const archived = path.join(DATA_DIR, 'archived.json');
    await fs.move(FILE_PATH, archived, { overwrite: true });
    console.log('📁 File archived as:', archived);

    // 7️⃣ Empty the backup directory (example cleanup policy)
    await fs.emptyDir(BACKUP_DIR);
    console.log('🧹 Backup directory emptied.');
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

runFileManager();