/**
 * Topic: HTTP Module → 01 Basic Server (ESM)
 * Purpose: Demonstrates creating a minimal HTTP server using ES Module syntax.
 * Key Points:
 * - We import the built-in 'http' module using ESM 'import'.
 * - http.createServer() takes a request handler callback.
 * - This handler receives 'req' (request) and 'res' (response).
 * - res.end() sends the response and closes the connection.
 * - server.listen() binds the server to a specific port.
 * Run: node src/07-build-api/02-api-calls/01-http-module/01-basic-server.js
 * Expected:
 * - Console logs: "Server running at http://localhost:3000/"
 * - Browser (at localhost:3000): "Hello World!"
 */

// Use ES Module 'import' syntax
import http from "http";

// Create the server
const server = http.createServer((req, res) => {
  // This callback handles *every* request.
  res.end("Hello World!");
});

const PORT = 3000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// Notes:
// - To use 'import', your package.json must have {"type": "module"}.
// - This server responds with "Hello World!" to every single request,
//   regardless of the URL path (e.g., /, /about, /favicon.ico).