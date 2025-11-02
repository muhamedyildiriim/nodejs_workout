/**
 * Topic: HTTP Module → 03 Basic Routing (ESM)
 * Purpose: Demonstrates handling different URLs with manual conditional logic.
 * Key Points:
 * - The native 'http' module has no built-in router.
 * - We create a "router" by manually checking the 'req.url' property.
 * - An 'if/else if/else' or 'switch' statement is the common pattern.
 * - It's critical to handle unknown routes with a 404 "Not Found" status.
 * - We set 'Content-Type' to 'text/html' to allow the browser to render HTML tags.
 * Run: node src/07-build-api/02-api-calls/01-http-module/03-basic-routing.js
 * Expected:
 * - Browser (at /): "Welcome to the Home Page!"
 * - Browser (at /about): "This is the About Page."
 * - Browser (at /other): "404 Not Found" (with HTML content)
 */

import http from "http";

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    // Home Page
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome to the Home Page!</h1>");
  } else if (url === "/about") {
    // About Page
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h2>This is the About Page.</h2>");
  } else {
    // 404 Not Found
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 Not Found</h1><p>The page you requested does not exist.</p>");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running. Try / and /about`);
});

// Notes:
// - This manual routing is tedious and scales poorly.
// - Imagine adding 100 routes or handling dynamic params like '/users/123'.
// - This is the *exact* problem that frameworks like Express solve elegantly.