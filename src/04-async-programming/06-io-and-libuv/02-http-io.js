/**
 * Topic: Async Programming → I/O & libuv → HTTP (Network I/O)
 * Purpose: Demonstrates non-blocking socket I/O in Node.js using HTTP client/server APIs.
 * Key Points:
 *  - libuv manages sockets via the poll phase of the event loop
 *  - Backpressure and timeouts prevent hung or overloaded connections
 *  - Thousands of concurrent sockets can run on a single thread
 * Run: node src/04-async-programming/06-io-and-libuv/02-http-io.js
 * Expected:
 *  - Starts an HTTP server on :3000
 *  - Client prints "hello world" response with proper timeout handling
 */

import http from "node:http";

// Tiny server with keep-alive, backpressure, and timeouts
const server = http.createServer((req, res) => {
  res.setHeader("Connection", "keep-alive");

  // write() returns a boolean — if false, wait for 'drain' before continuing
  const ok = res.write("hello ");
  if (!ok) {
    res.once("drain", () => res.end("world"));
  } else {
    res.end("world");
  }
});

// Configure server timeouts
server.headersTimeout = 60_000;
server.requestTimeout = 30_000;

server.listen(3000, () => console.log("server on :3000"));

// Simple HTTP client with timeout and error handling
function get(path) {
  return new Promise((resolve, reject) => {
    const req = http.get({ host: "localhost", port: 3000, path, timeout: 5000 }, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks).toString()));
    });

    req.on("timeout", () => req.destroy(new Error("client timeout")));
    req.on("error", reject);
  });
}

get("/").then(console.log).catch(console.error);

/*
Notes:
- Network I/O is fully event-driven and powered by libuv’s poll phase.
- Use connection pooling and keep-alive to reduce latency and resource churn.
- Always define timeouts for outgoing requests to prevent leaks and stuck sockets.
- Backpressure management (write() return value) ensures flow control on busy streams.
*/