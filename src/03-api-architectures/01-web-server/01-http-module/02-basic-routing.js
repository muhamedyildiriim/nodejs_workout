/**
 * File: /03-api-architectures/01-web-server/01-http-module/02-basic-routing.js
 * Topic: API Architectures → Web Server → `http` Module (The "Pain" of Routing)
 * Purpose: Demonstrates the "painful", "brittle" way of handling routing *manually*
 * using the raw `http` module.
 *
 * Key Points:
 * - We must *manually* check `req.url` and `req.method` using `if/else`.
 * - This creates "Callback Hell" inside the listener.
 * - This is "brittle" and does not scale.
 * - **This file proves *why* we need a Framework (like Express.js).**
 *
 * Run:
 * 1. node src/03-api-architectures/01-web-server/01-http-module/02-basic-routing.js
 * 2. Open `http://localhost:3000` (Homepage)
 * 3. Open `http://localhost:3000/about` (About Page)
 * 4. Open `http://localhost:3000/foo` (404 Page)
 *
 * Expected:
 * - Each URL will show a different response.
 */

import http from "node:http";

const PORT = 3000;

const requestListener = (req, res) => {
  const url = req.url;
  const method = req.method;

  res.setHeader("Content-Type", "text/plain");

  // --- This is the "Manual" Routing ---
  if (url === "/" && method === "GET") {
    res.statusCode = 200;
    res.end("This is the Homepage.");
  } else if (url === "/about" && method === "GET") {
    res.statusCode = 200;
    res.end("This is the About Page.");
  } else {
    // 404 Not Found
    res.statusCode = 404;
    res.end("404 Not Found. This page does not exist.");
  }
  // ------------------------------------------
};

const server = http.createServer(requestListener);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Notes:
// - Imagine adding 100 routes (e.g., `/api/users/1`, `/api/posts`).
// - This `if/else` block would become an unmanageable "Sin" (the "Sin" of `http-module`).
// - This is the *problem* that `Express.Router` solves.