// ============================================
// ============= ERROR RECOVERY ===============
// ============================================

// Retry mechanism for operational errors (e.g. network failure)
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
      await new Promise(res => setTimeout(res, 500));
    }
  }
}

retry(unstableOperation)
  .then(console.log)
  .catch(err => console.error("All retries failed:", err.message));
// Useful for transient issues (network, DB connection).
// Implements exponential backoff or fixed delay retries.