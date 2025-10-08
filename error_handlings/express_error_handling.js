// ============================================
// ========= EXPRESS ERROR HANDLING ===========
// ============================================

// Global error handler middleware in Express

import express from "express";
const app = express();

app.get("/", (req, res, next) => {
  try {
    throw new Error("Something went wrong!");
  } catch (err) {
    next(err); // Forward error to middleware
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => console.log("Server running on port 3000"));

// In Express, calling next(err) passes the error to the global error-handling middleware.