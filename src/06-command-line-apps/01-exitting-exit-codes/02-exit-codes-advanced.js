/**
 * Topic: Node.js Core → Graceful Shutdown with process.on('SIGINT')
 * Purpose: Demonstrates how to handle Ctrl+C (SIGINT) to gracefully close an HTTP server before exiting.
 * Key Points:
 *  - http.createServer(): creates a basic HTTP server that responds with “OK”.
 *  - process.on('SIGINT', ...): listens for the interrupt signal (Ctrl+C) sent to terminate the program.
 *  - server.close(): stops accepting new connections and waits for existing ones to finish.
 *  - Graceful shutdown prevents data loss, abrupt termination, or port-lock issues.
 * Run: node src/06-command-line-apps/01-exitting-exit-codes/02-exit-codes-advanced.js
 * Expected:
 *  - When server starts: listens on port 3000 and responds with “OK”.
 *  - When user presses Ctrl+C: logs cleanup messages, closes the server, and exits with code 0.
 */

import http from 'http';

const server = http.createServer((req, res) => res.end('OK'));
server.listen(3000);

process.on('SIGINT', () => {
  console.log('\n🧹 Server kapanıyor...');
  server.close(() => {
    console.log('✅ Temiz kapatma tamamlandı.');
    process.exit(0);
  });
});