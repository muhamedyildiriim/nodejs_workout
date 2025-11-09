/**
 * File: /03-api-architectures/01-web-server/02-express-js/03-express-router.js
 * Topic: API Architectures → Web Server → Express.js (The `Router` Architecture)
 * Purpose: Demonstrates the difference-making solution for "Separation of Concerns": The `Express.Router`.
 *
 * Key Points:
 * - **The Problem:** Putting *all* routes (`/`, `/about`, `/api/users`, `/api/posts`) into *one* `index.js` file is "messy" and "unmaintainable".
 * - **The Solution:** `Express.Router`.
 * - `Express.Router` is a "mini-app". It's a "middleware" that *only* handles routes for a specific concept (e.g., "all user-related routes").
 * - This keeps our main `index.js` file *clean* and "decoupled".
 *
 * Run:
 * 1. node src/03-api-architectures/01-web-server/02-express-js/03-express-router.js
 * 2. GET `http://localhost:3000/`
 * 3. GET `http://localhost:3000/api/users`
 * 4. GET `http://localhost:3000/api/users/123`
 *
 * Expected:
 * - Each route returns the correct response from the correct file.
 */

import express from "express";

// --- We will *simulate* this file being in another directory ---
// (In a "real" app, `userRouter` would be in `routes/users.js`)
// ---
// start: routes/users.js
const userRouter = express.Router();

// A middleware *just for this router*
userRouter.use((req, res, next) => {
  console.log("User Router Middleware: Accessing /users...");
  next();
});

// NOTE: This path is now *relative* (göreceli) to the router.
// `GET /api/users` -> `GET /`
userRouter.get("/", (req, res) => {
  res.json([
    { id: 1, name: "User One" },
    { id: 2, name: "User Two" },
  ]);
});

// `GET /api/users/:id` -> `GET /:id`
userRouter.get("/:id", (req, res) => {
  res.json({ id: req.params.id, name: `User ${req.params.id}` });
});
// end: routes/users.js
// ---

// --- 1. The Main Server File (e.g., `index.js`) ---
const app = express();
const PORT = 3000;

// 2. Global Middleware (Ara Yazılımlar)
app.use(express.json());

// 3. "Mount" the Router
// This tells Express: "Hey Express, any request that
// *starts with* `/api/users` should be *delegated*
// to the `userRouter` 'mini-app'."
app.use("/api/users", userRouter);

// 4. Other "Root" Routes
app.get("/", (req, res) => {
  res.send("This is the Homepage.");
});

// 5. Start Server
app.listen(PORT, () => {
  console.log(`"Router" server running on http://localhost:${PORT}`);
});

// Notes:
// - This is the difference-making
//   pattern for building large, maintainable APIs.
// - Your `index.js` only knows *about* the "Router",
//   it doesn't know *what* the router does (the routes).
// - This is "Sorumlulukların Ayrılması" (Separation of Concerns).