/**
 * Topic: Node.js File Watcher → chokidar (Real-time File Monitoring)
 * Purpose: Demonstrates how to monitor file system changes (additions, edits, deletions)
 *          inside a target directory using the chokidar library.
 * Key Points:
 *  - chokidar.watch(path, options): efficiently watches for file/folder changes.
 *  - Listens for 'add', 'change', and 'unlink' events to detect file actions.
 *  - Uses native OS file system notifications (fast & lightweight).
 *  - Ideal for auto-reload tools, live-build systems, or backup triggers.
 * Run: node src/05-files-and-paths/07-chokidar/01-chokidar-basics.js
 * Expected:
 *  - Watches the ./data directory continuously.
 *  - Logs an event each time a file is added, modified, or deleted.
 */

import chokidar from 'chokidar';

// === Initialize watcher ===
const watcher = chokidar.watch('./data', { persistent: true });

// === Event handlers ===
watcher
  .on('add', filePath => console.log(`🟢 New file added: ${filePath}`))
  .on('change', filePath => console.log(`🟡 File modified: ${filePath}`))
  .on('unlink', filePath => console.log(`🔴 File deleted: ${filePath}`));

// (Optional) handle folder-level events too
// .on('addDir', dirPath => console.log(`📁 Directory added: ${dirPath}`))
// .on('unlinkDir', dirPath => console.log(`🗑️ Directory removed: ${dirPath}`));

// Keep the process alive
console.log('👀 Watching ./data for changes...');