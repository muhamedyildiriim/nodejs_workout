/**
 * Topic: Express Basics → App & Middleware
 * Purpose: Minimal Express API with secure defaults, routing, and centralized error handling.
 * Highlights:
 *  - JSON body parsing, CORS, Helmet
 *  - Clean route separation
 *  - Global error handler
 *
 * Run: node src/07-build-api/01-frameworks/01-express/01-express-basic/app.js
 * Expected:
 *  - GET /health → { ok: true }
 *  - GET /boom → triggers demo error and returns structured JSON
 */

import express from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes.js";
import { notFound, errorHandler } from "./errors.js";

const app = express();

// Core middlewares
// Helmet: sets various HTTP headers to protect against well-known web vulnerabilities
app.use(helmet());
// CORS: enables controlled cross-origin requests (e.g., from frontend domains)
app.use(cors());
// Built-in: parses incoming JSON request bodies
app.use(express.json());

// Health check
app.get("/health", (req, res) => res.json({ ok: true, ts: Date.now() }));

// Routes
app.use("/api", routes);

// 404 and global error handler
app.use(notFound);
app.use(errorHandler);

// Boot standalone
// Boot standalone: start the server only when this file is executed directly
// Prevents the app from auto-starting when imported by another module (e.g. in tests)
// process.argv is a built-in Node.js array that contains the command-line arguments passed when you run a Node program.
if (import.meta.url === `file://${process.argv[1]}`) {
  //process.env is a built-in Node.js object that gives access to environment variables — settings and secrets defined outside your code (like in .env, Docker, or a hosting service).
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`express-basics running on :${PORT}`));
}

// Export the Express app instance as the default export
// → Allows other modules (e.g., server.js, tests) to import and use this app directly
export default app;