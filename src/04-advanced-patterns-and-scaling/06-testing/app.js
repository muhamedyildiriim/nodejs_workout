/**
 * File: /04-advanced-patterns-and-scaling/06-testing/app.js
 * Purpose: A minimal Express app exported for Integration Testing.
 * Note: We export `app`, we do NOT call `app.listen` here directly
 * (to avoid port conflicts during tests).
 */

import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/users", (req, res) => {
  const { username } = req.body;
  
  if (!username) {
    return res.status(400).json({ error: "Username required" });
  }

  res.status(201).json({ id: 1, username });
});

export default app;