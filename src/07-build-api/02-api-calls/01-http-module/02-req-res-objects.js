/**
 * Topic: HTTP Module → 02 Request & Response Objects (ESM)
 * Purpose: Demonstrates inspecting the request (req) and building a proper response (res).
 * Key Points:
 * - 'req' (IncomingMessage) contains info *from* the client (url, method, headers).
 * - 'res' (ServerResponse) is used to send data *back* to the client.
 * - res.writeHead() is crucial. It sets the HTTP status code and response headers.
 * - 'Content-Type' header tells the browser how to render the data (e.g., text, HTML, JSON).
 * - res.write() sends a chunk of data.
 * - res.end() signals the response is complete.
 * Run: node src/07-build-api/02-api-calls/01-http-module/02-req-res-objects.js
 * Expected:
 * - Console logs the URL and method for each request.
 * - Browser (at localhost:3000): "This is the response body!"
 */

import http from "http";

const server = http.createServer((req, res) => {
  // 1. Inspect the Request (req)
  console.log(`Request received!`);
  console.log(`  URL: ${req.url}`);
  console.log(`  Method: ${req.method}`);

  // 2. Control the Response (res)

  // Set the status code (200 = OK) and Content-Type header
  // This tells the browser to interpret this as plain text.
  res.writeHead(200, { "Content-Type": "text/plain" });

  // Write a piece of the body (optional, good for streaming)
  res.write("This is the response body!");

  // End the response. This is mandatory.
  res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running. Try visiting http://localhost:${PORT}/foo`);
});

// Notes:
// - res.end("Hello") is a shortcut for res.write("Hello") followed by res.end().
// - You CANNOT call res.write() or res.writeHead() *after* res.end() has been called.
// - You'll see the browser request '/favicon.ico' in your logs. This is normal.