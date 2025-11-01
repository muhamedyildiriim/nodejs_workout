/**
 * Topic: Routing → Basic Handlers
 * Purpose: Demonstrates simple route definitions and forwarding errors to middleware.
 * Highlights:
 *  - Express Router usage
 *  - Example error propagation via next(err)
 */

import { Router } from "express";

const router = Router();

router.get("/welcome", (req, res) => {
  res.json({ message: "Welcome to Express Basics." });
});

router.get("/boom", (req, res, next) => {
  const err = new Error("Intentional failure to demonstrate error flow");
  err.statusCode = 400;
  err.code = "DEMO_FAILURE";
  next(err);
});

export default router;