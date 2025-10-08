// ============================================
// ============== CLUSTER ERRORS ==============
// ============================================

// Catching errors in cluster / worker processes

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

// Use worker.on('error') and worker.on('exit') to handle errors in child processes.