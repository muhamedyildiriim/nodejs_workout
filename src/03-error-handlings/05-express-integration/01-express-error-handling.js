/**
 * Topic: Error Handling → Express Integration → Global Error Middleware
 * Purpose: Demonstrates forwarding route errors to a centralized Express error handler.
 * Key Points:
 *  - Use next(err) (or throw inside async) to reach the global handler
 *  - Never leak raw stacks to clients; return a safe JSON shape
 *  - Log server-side; send status codes appropriately (500 for unexpected)
 * Run: node src/03-error-handlings/05-express-integration/01-express-error-handling.js
 * Expected:
 *  - GET / → response { "error": "Something went wrong!" } with HTTP 500
 */

import express from "express";

const app = express();
app.use(express.json());

// Example route that forwards an error
app.get("/", (_req, _res, next) => {
  try {
    throw new Error("Something went wrong!");
  } catch (err) {
    next(err); // Forward to global error handler
  }
});

// Global error handler (centralized)
app.use((err, _req, res, _next) => {
  // Server-side logging (keep details out of the client response)
  console.error("Error:", err.message);

  // Basic mapping: default to 500 for unexpected errors
  const status = typeof err.statusCode === "number" ? err.statusCode : 500;

  res.status(status).json({
    error: status === 500 ? "Internal Server Error" : err.message,
    // Optionally include a public-safe code:
    code: err.code || undefined
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// Notes:
// - For async handlers, prefer: app.get('/x', async (req,res,next)=>{ try{ await ... } catch(e){ next(e) } });
// - In production, integrate a logger (e.g., Pino/Winston) and structured error classes to set statusCode/code.