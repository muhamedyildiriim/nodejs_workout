/**
 * File: /04-advanced-patterns-and-scaling/03-error-handling/04-express-global-handler.js
 * Topic: Advanced Patterns → Error Handling → "Global" Express Handler
 * Purpose: This is the **"Mastery" code**. It demonstrates the solution for "Centralized Error Handling" in an Express.js application.
 *
 * "The Architecture":
 * - **The Problem:** Putting `try...catch` blocks in *every*
 * Express route handler is "messy" and "repetitive".
 * - **The Solution:**
 * 1. We create a "Global Error Handling Middleware".
 * This is a *special* Express middleware with **4 arguments**
 * (`(err, req, res, next)`).
 * 2. This middleware *must* be defined **LAST**,
 * after all other `app.use()` and routes.
 * 3. In our routes, we *stop* using `try...catch`. We just call `next(error)`.
 * 4. Express *automatically* skips all other routes
 * and sends the `error` *directly* to our
 * "Global Handler".
 *
 * Install: npm install express
 * Run:
 * 1. node src/04-advanced-patterns-and-scaling/03-error-handling/04-express-global-handler.js
 * 2. GET `http://localhost:3000/success` (Works)
 * 3. GET `http://localhost:3000/fail-operational` (Returns 404 JSON)
 * 4. GET `http://localhost:3000/fail-programmer` (Returns 500 JSON)
 *
 * Expected:
 * - All errors are caught *by one function*.
 */

import express from "express";

// --- 1. The Custom Error Class ---
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = true; // This is a "safe" error
    Error.captureStackTrace(this, this.constructor);
  }
}

// --- 2. The Express App ---
const app = express();
const PORT = 3000;

// --- 3. The Routes (The "Clean" Way) ---
// Note: We use `(req, res, next)`
app.get("/success", (req, res, next) => {
  res.status(200).json({ message: "Success!" });
});

app.get("/fail-operational", (req, res, next) => {
  // We don't `try...catch`. We just pass the error to `next()`.
  // This is an "Operational Error" (safe).
  const err = new AppError("User not found", 404);
  next(err);
});

app.get("/fail-programmer", (req, res, next) => {
  // We don't `try...catch`.
  // This is a "Programmer Error" (unsafe).
  try {
    const a = null;
    a.toString(); // Throws TypeError
  } catch (err) {
    next(err); // We pass the "unsafe" error to `next()`
  }
});

// --- 4. THE GLOBAL ERROR HANDLER ---
// This *must* have 4 arguments (`err`, `req`, `res`, `next`).
// This *must* be at the *end* of the middleware stack.
app.use((err, req, res, next) => {
  console.error("--- GLOBAL HANDLER CAUGHT AN ERROR ---");
  console.error("Error Name:", err.name);
  console.error("Error Message:", err.message);
  // console.error("Error Stack:", err.stack); // (Log this in production)

  // This is the "Programmer vs. Operational" logic
  if (err.isOperational) {
    // "Operational Error" (e.g., AppError)
    // We send a "clean" message to the client.
    res.status(err.statusCode).json({
      status: "fail",
      message: err.message,
    });
  } else {
    // "Programmer Error" (e.g., TypeError)
    // We do *not* "leak" the error details to the client.
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
    // (In a real app, we would crash here: `process.exit(1)`)
  }
});

app.listen(PORT, () => {
  console.log(`"Global Error Handler" server running on http://localhost:${PORT}`);
});

// Notes:
// - This "Global Handler" is the difference-making concept for "robust" Express.js APIs.