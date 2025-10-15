// File: src/async-programming/12-realworld/api-concurrency-demo/server.js
// Topic: Parallel API aggregation using Promise.all
// What it is: Simple HTTP server combining multiple async operations concurrently.
// Why it matters: Demonstrates efficient concurrency patterns in I/O-bound APIs.
// When to use: Dashboard aggregation, analytics endpoints, or data federation.
// How it helps: Reduces total latency by performing independent calls in parallel.
// Critical points:
//  - Use Promise.all for concurrent tasks; Promise.race for timeout protection.
//  - Always validate inputs and handle rejections properly.
// Pitfalls to avoid:
//  - Forgetting to handle slow or failed services (hangs or partial data).
// Real-world use:
//  - Aggregating user data, permissions, and activity logs from multiple microservices.

import http from "node:http";
import { getUser, getPermissions, getRecentActivity } from "./services.js";

const PORT = 3001;

function json(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, null, 2));
}

const server = http.createServer(async (req, res) => {
  if (req.url === "/dashboard") {
    // Timeout protection (5 seconds)
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout exceeded")), 5000)
    );

    try {
      const [user, perms, activity] = await Promise.race([
        Promise.all([getUser(), getPermissions(), getRecentActivity()]),
        timeout,
      ]);
      json(res, 200, { user, permissions: perms, activity });
    } catch (err) {
      json(res, 504, { error: err.message });
    }
    return;
  }

  json(res, 404, { error: "Not found" });
});

server.listen(PORT, () =>
  console.log(`API Concurrency Demo running on http://localhost:${PORT}/dashboard`)
);