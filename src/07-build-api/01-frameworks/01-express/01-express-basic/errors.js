/**
 * Topic: Error Handling → Centralized Middleware
 * Purpose: Normalize and return consistent JSON error responses.
 * Highlights:
 *  - 404 handler
 *  - Unified error response format
 */

export function notFound(req, res, next) {
  const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  err.statusCode = 404;
  err.code = "NOT_FOUND";
  next(err);
}

export function errorHandler(err, req, res, _next) {
  const status = err.statusCode || 500;
  const payload = {
    error: {
      code: err.code || "INTERNAL_ERROR",
      message:
        status >= 500
          ? "Unexpected error. Please try again later."
          : err.message,
    },
  };
  console.error(`[${status}]`, err);
  res.status(status).json(payload);
}