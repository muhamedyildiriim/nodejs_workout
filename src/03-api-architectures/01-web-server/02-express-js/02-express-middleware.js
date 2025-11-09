/**
 * File: /03-api-architectures/01-web-server/02-express-js/02-express-middleware.js
 * Topic: API Architectures → Web Server → Express.js (Middleware Concepts)
 * Purpose: Demonstrates the *most important* concept in Express:
 * **Middleware**.
 *
 * Key Points:
 * - A "Middleware" is a function that has access to
 * `req` (request), `res` (response), and `next` (the *next*
 * middleware function in the chain).
 * - **This is the difference-making concept.**
 * - The entire Express API is just a stack of middleware.
 * - `app.use()`: Applies a middleware to *all* routes.
 * - `next()`: This "magic" function *must* be called to pass
 * control to the *next* middleware in the "chain".
 * - If `next()` is not called, the request "hangs"
 *
 * Run:
 * 1. node src/03-api-architectures/01-web-server/02-express-js/02-express-middleware.js
 * 2. GET `http://localhost:3000/`
 *
 * Expected (in terminal):
 * 1. "LOG: New request received: GET /"
 * 2. "AUTH: (Simulating) User is authenticated."
 * 3. (Browser will show "Hello from /")
 */

import express from "express";

const app = express();
const PORT = 3000;

// --- "Mimar" (Architect) "Middleware" (Ara Yazılım) Zinciri (Chain) ---

// "Middleware 1": A simple logger
// This runs for *every* request.
app.use((req, res, next) => {
  console.log(`LOG: New request received: ${req.method} ${req.url}`);
  // Pass control to the *next* middleware
  next();
});

// "Middleware 2": A (simulated) authentication check
app.use((req, res, next) => {
  console.log("AUTH: (Simulating) User is authenticated.");
  // We can "attach" (eklemek) data to the `req` object for
  // later middleware (like our route handlers) to use.
  req.user = { id: 123, name: "Test User" };
  next();
});

// "Middleware 3": The "Route Handler" (Yönlendirme İşleyicisi)
// This is *also* a middleware. It just happens to *end* the request.
app.get("/", (req, res) => {
  // We can access the data attached by the previous middleware
  const userName = req.user ? req.user.name : "Guest";

  res.send(`Hello from / (User: ${userName})`);
  // We *don't* call `next()` here, because we are *ending*
  // the request with `res.send()`.
});

// ---------------------------------------------------

app.listen(PORT, () => {
  console.log(`Middleware demo server running on http://localhost:${PORT}`);
});

// Notes:
// - `express.json()` (from the last file) *is just a middleware*.
// - `passport.authenticate()` (from `03-auth`) *is just a middleware*.
// - `Helmet` (for security) *is just a middleware*.
// - Express is "middleware" (ara yazılım).