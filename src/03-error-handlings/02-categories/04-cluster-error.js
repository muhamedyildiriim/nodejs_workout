/**
 * Topic: Error Handling → Categories → Cluster Errors
 * Purpose: Shows how to catch and handle errors in Node.js worker processes.
 * Key Points:
 *  - Use worker.on('error') and worker.on('exit') to monitor child process health
 *  - Primary process can restart or log worker failures
 *  - Common pattern in multi-core production apps
 * Run: node src/03-error-handlings/02-categories/04-cluster-error.js
 * Expected:
 *  - Worker throws an error and exits, with logs for both 'error' and 'exit' events
 */

import cluster from "cluster";

if (cluster.isPrimary) {
  const worker = cluster.fork();

  worker.on("error", (err) => {
    console.error("Worker error:", err.message);
  });

  worker.on("exit", (code) => {
    console.log(`Worker exited with code ${code}`);
  });
} else {
  throw new Error("Error inside worker!");
}

// Notes:
// - Use cluster to scale Node.js across CPU cores.
// - Handle worker errors centrally for better reliability.
// - In production, restart failed workers automatically.