/**
 * File: /02-project-infrastructure/04-process-object/03-graceful-shutdown.js
 * Topic: Project Infrastructure → `process` Object → Graceful Shutdown
 * Purpose: This is the "Mastery" code. It demonstrates the solution for shutting down a server *safely*
 * without corrupting data or dropping connections.
 *
 * Key Points:
 * - "The Problem": Pressing `Ctrl+C` kills the process *instantly*.
 * If we are in the middle of a database write, the data is corrupted.
 * - "The Signal": `Ctrl+C` sends a `SIGINT` (Signal Interrupt) to `process`.
 * - "The Solution": We *listen* for `process.on('SIGINT', ...)`
 * (The Manager answers the phone).
 * - Inside the listener, we stop new work (`server.close()`),
 * clean up resources (`db.close()`), and *then* exit.
 *
 * Run:
 * 1. node src/02-project-infrastructure/04-process-object/03-graceful-shutdown.js
 * 2. (The server will be running)
 * 3. Press `Ctrl+C` in the terminal.
 *
 * Expected:
 * - "Server running... (Press Ctrl+C to shut down)"
 * - (You press Ctrl+C)
 * - "Shutdown signal received. Closing server..."
 * - "Server has closed. All cleanup finished."
 * - "Exiting process."
 */

import http from "node:http";

// --- 1. A Simulated Resource (e.g., a Database or Web Server) ---
const server = http.createServer((req, res) => {
  res.end("This server is running.");
});

// A (simulated) database connection
const db = {
  isOpen: true,
  close(callback) {
    console.log("Database connection closing...");
    setTimeout(() => {
      this.isOpen = false;
      console.log("Database connection closed.");
      callback();
    }, 500); // Simulate 0.5s cleanup time
  },
};

// --- 2. The "Graceful Shutdown" Logic ---

function gracefulShutdown() {
  console.log("\nShutdown signal received. Closing resources...");

  // 1. Stop the server from accepting *new* connections
  server.close((err) => {
    if (err) {
      console.error("Error closing server:", err);
      process.exit(1); // Exit with a failure code
    }
    console.log("HTTP server closed.");

    // 2. Close other resources (like the database)
    db.close(() => {
      console.log("All cleanup finished.");
      // 3. Now, we can safely exit.
      console.log("Exiting process.");
      process.exit(0); // Exit with a success code
    });
  });

  // Force-close connections after a timeout (e.g., 5 seconds)
  setTimeout(() => {
    console.error("Could not close connections in time, forcefully shutting down");
    process.exit(1);
  }, 5000);
}

// --- 3. Start the Server and Listen for the Signal ---
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("(Press Ctrl+C to test the graceful shutdown)");
});

// `SIGINT` is the signal for `Ctrl+C`
// `SIGTERM` is the signal sent by orchestrators (like Docker, Kubernetes)
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

// Prevent the app from closing immediately
// (In a real Express app, `server.listen` does this)
setInterval(() => {}, 1 << 30);