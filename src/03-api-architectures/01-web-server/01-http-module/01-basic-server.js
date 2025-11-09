/**
 * File: /03-api-architectures/01-web-server/01-http-module/01-basic-server.js
 * Topic: API Architectures → Web Server → The `http` Module (Raw)
 * Purpose: Demonstrates the *raw*, "low-level" Node.js
 * `http` module. This is the "foundation" that all
 * frameworks like Express.js are built on top of.
 *
 * Key Points:
 * - `http.createServer()`: The core tool that creates the server.
 * - It takes one argument: a `requestListener` callback function.
 * - This callback runs *every time* a new request hits the server.
 * - `req` (IncomingMessage): An object containing all request data (URL, headers, method).
 * - `res` (ServerResponse): An object used to *send* the response back to the client.
 * - `res.end()`: **Crucial**. You *must* call this to tell Node.js the response is complete.
 *
 * Run:
 * 1. node src/03-api-architectures/01-web-server/01-http-module/01-basic-server.js
 * 2. Open `http://localhost:3000` in your browser.
 *
 * Expected:
 * - Browser shows "Hello, World!"
 * - Terminal logs "Server running on http://localhost:3000"
 */

import http from "node:http";

const PORT = 3000;

// 1. The Request Listener Callback
// This function handles ALL incoming requests.
const requestListener = (req, res) => {
  // `req` (request) is what the user *sent* us.
  // `res` (response) is what we *send back*.

  // 2. Set the Response Header
  // We tell the client we are sending back plain text.
  res.setHeader("Content-Type", "text/plain");

  // 3. Set the HTTP Status Code
  res.statusCode = 200; // 200 = "OK"

  // 4. Write the Response Body and End
  res.end("Hello, World!");
};

// 5. Create and Start the Server
const server = http.createServer(requestListener);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Notes:
// - This is "low-level". We have to manually set headers and status codes.
// - Notice that *every* request (e.g., `/` or `/about` or `/foo`) will get the *same* "Hello, World!" response.
// - This is the "pain point" that `02-basic-routing.js` will solve.