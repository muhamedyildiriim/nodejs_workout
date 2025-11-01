/**
 * Topic: Express Advanced → Composable App
 * Purpose: Combine middleware, validation, and performance timing in one cohesive app.
 * Highlights:
 *  - Modular composition
 *  - Request timing metric
 *  - Zod validation integration
 */

import express from "express";
import { core, notFound, errorHandler } from "./middleware.js";
import { usersController } from "./users.module.js";

function buildApp(cfg) {
  const app = express();
  core(app, cfg);
  app.use(express.json());

  // Health & meta
  app.get("/health", (req, res) => res.json({ ok: true, id: req.id }));

  // Users
  app.get("/api/users", usersController.list);
  app.post("/api/users", usersController.create);

  // Latency measurement
  app.get("/meta/timing", (req, res) => {
    const end = process.hrtime.bigint();
    const elapsedMs = Number(end - req.startAt) / 1_000_000;
    res.json({ requestId: req.id, elapsedMs });
  });

  app.use(notFound);
  app.use(errorHandler);
  return app;
}

export { buildApp };