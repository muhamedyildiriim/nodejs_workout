/**
 * Topic: Middleware → Logging, Security, Rate Limiting
 * Purpose: Adds request IDs, structured logging, and safe error responses.
 * Highlights:
 *  - nanoid for unique requestId
 *  - pino for structured logging
 *  - Global rate limit and error normalization
 */

import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { nanoid } from "nanoid";
import pino from "pino";
import pretty from "pino-pretty";

const logger =
  process.env.NODE_ENV === "production"
    ? pino()
    : pino(pretty({ translateTime: "SYS:standard" }));

function requestId(req, _res, next) {
  req.id = req.headers["x-request-id"] || nanoid();
  next();
}

function requestLogger(req, _res, next) {
  logger.info({ id: req.id, method: req.method, url: req.originalUrl }, "REQ");
  next();
}

function notFound(req, res, next) {
  const err = new Error(`Not Found: ${req.method} ${req.originalUrl}`);
  err.statusCode = 404;
  err.code = "NOT_FOUND";
  next(err);
}

function errorHandler(err, req, res, _next) {
  const status = err.statusCode || 500;
  const body = {
    error: {
      code: err.code || "INTERNAL_ERROR",
      message:
        status >= 500
          ? "Unexpected server error. Reference this requestId for support."
          : err.message,
      requestId: req.id,
    },
  };
  logger.error(
    { id: req.id, status, code: body.error.code, stack: err.stack },
    "ERR"
  );
  res.status(status).json(body);
}

function core(app, cfg) {
  app.use(helmet());                 // Security headers
  app.use(cors());                   // Cross-origin access
  app.use(requestId);                // Correlation id
  if (cfg.requestLog) app.use(requestLogger);

  app.use(
    rateLimit({
      windowMs: cfg.rate.windowMs,
      max: cfg.rate.max,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  // Timing baseline for simple latency measurements
  app.use((req, _res, next) => {
    req.startAt = process.hrtime.bigint();
    next();
  });
}

export { core, notFound, errorHandler, logger };