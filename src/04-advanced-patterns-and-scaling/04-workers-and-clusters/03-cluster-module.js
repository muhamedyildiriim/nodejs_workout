/**
 * File: /04-advanced-patterns-and-scaling/04-workers-and-clusters/03-cluster-module.js
 * Topic: Advanced Patterns → Scaling → Clustering
 * Purpose: Demonstrates how to use the `cluster` module to fork the process
 * and utilize *all* available CPU cores. This is the engine behind `pm2`.
 *
 * Key Points:
 * - Node.js runs on 1 core by default.
 * - `cluster.fork()`: Creates a copy (Worker) of the application.
 * - `Primary` (Master): The manager process that creates workers.
 * - `Worker`: The actual HTTP servers handling requests.
 * - Incoming traffic is automatically load-balanced between workers.
 * - If one worker crashes or is busy, others handle the traffic.
 *
 * Run: node src/04-advanced-patterns-and-scaling/04-workers-and-clusters/03-cluster-module.js
 * Expected:
 * - Logs "Primary process is running..."
 * - Logs "Worker started..." for each CPU core.
 * - Requests to `http://localhost:3000` will be handled by different IDs.
 */

import cluster from "node:cluster";
import http from "node:http";
import { availableParallelism } from "node:os";
import process from "node:process";

// Get the number of available CPU cores
const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  // --- 1. The Primary Process (Manager) ---
  console.log(`Primary process ${process.pid} is running`);
  console.log(`Forking server for ${numCPUs} CPUs...`);

  // Fork workers (create a copy for each CPU)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for dying workers (and restart them - resilience)
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

} else {
  // --- 2. The Worker Process (The actual Server) ---
  // Workers can share any TCP connection.
  // In this case, it is an HTTP server.

  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end(`Hello from Worker ${process.pid}\n`);
      // Log which worker handled the request
      console.log(`Worker ${process.pid} handled request.`);
    })
    .listen(3000);

  console.log(`Worker ${process.pid} started`);
}