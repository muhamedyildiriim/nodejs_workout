/**
 * Topic: Node.js Automation → chokidar + child_process (Auto Build Watcher)
 * Purpose: Automatically rebuilds the project whenever source files change.
 * Key Points:
 *  - chokidar efficiently watches the ./src directory for file changes.
 *  - Ignores node_modules to prevent unnecessary triggers.
 *  - child_process.exec() runs `npm run build` each time a file changes.
 *  - Ideal for development: live rebuild, CI/CD automation, or hot-reload setups.
 * Run: node src/05-files-and-paths/07-chokidar/02-chokidar-advanced.js
 * Expected:
 *  - Watches ./src continuously.
 *  - On file change → logs a rebuild message and runs the build script.
 *  - Prints “✅ Build complete!” when done.
 */

import chokidar from 'chokidar';
import { exec } from 'node:child_process';

// === Initialize watcher ===
chokidar.watch('./src', { ignored: /node_modules/ }).on('change', (file) => {
  console.log(`🟡 ${file} changed. Rebuilding...`);

  // === Execute build command ===
  exec('npm run build', (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Build failed:', err.message);
      return;
    }

    // Optional: print build logs
    if (stdout) console.log(stdout.trim());
    if (stderr) console.error(stderr.trim());

    console.log('✅ Build complete!');
  });
});

console.log('👀 Watching ./src for changes...');