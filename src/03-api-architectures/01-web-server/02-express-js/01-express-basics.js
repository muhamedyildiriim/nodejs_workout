/**
 * File: /03-api-architectures/01-web-server/02-express-js/01-express-basics.js
 * Topic: API Architectures → Web Server → Express.js
 * Purpose: Demonstrates how Express.js solves the 3 "pain points"
 * of the raw `http` module.
 *
 * Key Points:
 * - `Express` is a minimal and flexible Node.js web application framework.
 * - **Solution to Pain 1 (Routing):** `app.get()`, `app.post()`, etc.
 * Provides a "robust" and clean routing API.
 * - **Solution to Pain 2 (Sending JSON):** `res.json()`
 * Automatically sets `Content-Type: application/json` and `JSON.stringify()`.
 * - **Solution to Pain 3 (Receiving JSON):** `app.use(express.json())`
 * A "middleware" that *replaces* the manual `req.on('data')`
 * `Buffer` logic. It automatically parses the JSON body for us.
 *
 * Install: npm install express
 * Run:
 * 1. node src/03-api-architectures/01-web-server/02-express-js/01-express-basics.js
 * 2. GET `http://localhost:3000/`
 * 3. GET `http://localhost:3000/api/user`
 * 4. POST to `http://localhost:3000/api/user` with a JSON body:
 * `{"username": "my_user"}` (Use Postman)
 *
 * Expected:
 * - Each route returns the correct, clean response.
 */

import express from "express";

const app = express();
const PORT = 3000;

// --- Receiving JSON ---
// This one line of "middleware" (ara yazılım) replaces *all* the
// `req.on('data')`, `Buffer.concat()`, and `JSON.parse()` logic
// from the raw `http` module demo.
// It parses the JSON body and attaches it to `req.body`.
app.use(express.json());
// ----------------------------------------------------

// --- Routing ---
// No more `if (req.url === ...)`
app.get("/", (req, res) => {
  res.send("This is the Homepage."); // `res.send` is smart (sets headers)
});

app.get("/about", (req, res) => {
  res.send("This is the About Page.");
});

// --- Sending JSON ---
app.get("/api/user", (req, res) => {
  const user = { id: 1, name: "John Doe" };
  // `res.json()` *automatically* stringifies and sets the Content-Type header.
  res.json(user);
});

// --- Receiving JSON ---
app.post("/api/user", (req, res) => {
  // `express.json()` middleware already did the hard work.
  // The parsed data is ready for us in `req.body`.
  const userData = req.body;

  if (!userData || !userData.username) {
    return res.status(400).json({ error: "Username is required" });
  }

  res.status(201).json({
    message: "User created",
    dataReceived: userData,
  });
});

// --- 404 Rule ---
// A "catch-all" middleware that runs *only if* no other route was matched.
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});
// ------------------------------------------

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});