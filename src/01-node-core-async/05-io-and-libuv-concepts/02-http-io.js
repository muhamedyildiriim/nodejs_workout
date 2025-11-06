/**
 * File: /01-node-core-and-async/05-io-and-libuv-concepts/02-http-io.js
 * (PHASE 1: THEORY FILE)
 * Topic: Async Programming → I/O & libuv → Network (Non-Blocking)
 * Purpose: Demonstrates non-blocking *network* I/O.
 * Key Points:
 * - **CRITICAL DIFFERENCE:** Network I/O (like http, net) does *NOT*
 * use the Libuv Thread Pool ("Waiter").
 * - It uses the OS's native, event-driven mechanisms (e.g., epoll, kqueue).
 * - This is *even faster* and scales to *millions* of connections,
 * as it doesn't use a limited thread pool.
 * Run: node src/01-node-core-async/05-io-and-libuv-concepts/02-http-io.js
 * Expected:
 * - Starts a server and then a client prints "hello world".
 */

import http from "node:http";

// --- 1. The Server (Simulates an external API) ---
const server = http.createServer((req, res) => {
  res.setHeader("Connection", "keep-alive");
  res.end("hello world"); // Send response and close
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
  // Once the server is ready, run the client.
  runClientDemo();
});

// --- 2. The Client (Using modern async/await for http.get) ---
async function runClientDemo() {
  console.log("Client: Sending GET request...");
  try {
    const response = await getWithPromise("http://localhost:3000");
    console.log("Client Received:", response);
  } catch (error) {
    console.error("Client Error:", error.message);
  } finally {
    // We must manually close the server so the script can exit.
    server.close(() => console.log("Server shut down."));
  }
}

// "Architect's Refactor": Wrapping the "classic" http.get in a Promise.
function getWithPromise(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, { timeout: 2000 }, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks).toString()));
    });
    req.on("timeout", () => req.destroy(new Error("client timeout")));
    req.on("error", reject); // Handles network errors
  });
}