/**
 * Topic: Runtime → Graceful Startup & Shutdown
 * Purpose: Start and gracefully stop an HTTP server with signal handling.
 * Highlights:
 *  - Graceful termination (SIGINT, SIGTERM)
 *  - Single logging source
 *  - Config-driven port
 *
 * Run: node src/07-build-api/01-frameworks/01-express/02-express-advanced/server.js
 */

import http from "http";
import cfg from "./config.js";
import { buildApp } from "./app.js";
import { logger } from "./middleware.js";

const app = buildApp(cfg);
const server = http.createServer(app);

server.listen(cfg.port, () => {
  logger.info({ port: cfg.port, env: cfg.env }, "Server started");
});

function shutdown(signal) {
  logger.warn({ signal }, "Shutting down...");
  server.close((err) => {
    if (err) {
      logger.error({ err }, "Error during shutdown");
      process.exit(1);
    }
    logger.info("HTTP server closed. Bye 👋");
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));