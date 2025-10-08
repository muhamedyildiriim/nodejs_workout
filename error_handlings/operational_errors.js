// ============================================
// =========== OPERATIONAL ERRORS =============
// ============================================

// These are runtime errors caused by external conditions — not code bugs.

/*
Examples:
    Network down
    File not found
    Database connection failed
    Invalid user input
*/

import fs from 'fs';

fs.readFile('nonexistent.txt', 'utf8', (err, data) => {
  if (err) {
    console.error("Operational error:", err.message);
    return;
  }
  console.log(data);
});

/*
How to handle:

- Check err in callbacks
- Return graceful messages to users
- Retry, fallback, or log the issue
*/