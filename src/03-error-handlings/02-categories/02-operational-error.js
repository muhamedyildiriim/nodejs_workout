/**
 * Topic: Error Handling → Categories → Operational Errors
 * Purpose: Shows runtime errors caused by external conditions (not code bugs).
 * Key Points:
 *  - Common examples: network down, missing file, DB connection failure
 *  - Should be handled gracefully — retry, log, or fallback
 *  - Always provide safe messages to users, not raw errors
 * Run: node src/03-error-handlings/02-categories/02-operational-error.js
 * Expected:
 *  - Logs: "Operational error: ENOENT: no such file or directory, open 'nonexistent.txt'"
 */

import fs from "fs";

fs.readFile("nonexistent.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Operational error:", err.message);
    return;
  }
  console.log(data);
});

// Notes:
// - These are expected in production — they’re not code bugs.
// - Handle them with retries, fallbacks, or graceful degradation.
// - Log the issue and return user-friendly responses.