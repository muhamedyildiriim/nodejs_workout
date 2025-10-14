/**
 * Topic: Error Handling → Propagation & Recovery → Error Recovery
 * Purpose: Demonstrates retry mechanisms for transient or operational errors (e.g., network failures).
 * Key Points:
 *  - Recovery patterns improve resilience for unstable operations
 *  - Implement retry with fixed or exponential backoff
 *  - Avoid retrying programmer or logic errors
 * Run: node src/03-error-handlings/04-propagation-recovery/03-error-recovery.js
 * Expected:
 *  - Logs retries like:
 *    "Attempt 1 failed: Random failure"
 *    "Attempt 2 failed: Random failure"
 *    "Success" or "All retries failed: Random failure"
 */

function unstableOperation() {
  if (Math.random() < 0.7) throw new Error("Random failure");
  return "Success";
}

async function retry(fn, retries = 3) {
  for (let i = 1; i <= retries; i++) {
    try {
      return fn();
    } catch (err) {
      console.warn(`Attempt ${i} failed: ${err.message}`);
      if (i === retries) throw err;
      await new Promise((res) => setTimeout(res, 500));
    }
  }
}

retry(unstableOperation)
  .then(console.log)
  .catch((err) => console.error("All retries failed:", err.message));

// Notes:
// - Use retry only for transient errors (network, DB, timeouts).
// - Implement exponential backoff for production-grade resilience.