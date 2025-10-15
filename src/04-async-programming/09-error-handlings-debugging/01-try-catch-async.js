/**
 * Topic: Async Programming → Error Handling & Debugging → try/catch in Async
 * Purpose: Demonstrates handling rejected Promises like exceptions using async/await with try/catch.
 * Key Points:
 *  - Clear, synchronous-style flow for async errors and cleanup
 *  - Separate transient vs. permanent failures; retry transient ones with backoff
 *  - Always perform cleanup in finally (connections, temp files, etc.)
 * Run: node src/04-async-programming/09-error-handlings-debugging/01-try-catch-async.js
 * Expected:
 *  - Shows success, retry with backoff, and rollback simulation with clear logs
 */

const fakeNetworkCall = (shouldFail = false, delay = 100) =>
  new Promise((resolve, reject) =>
    setTimeout(() => (shouldFail ? reject(new Error("Network error")) : resolve("OK")), delay)
  );

// Example 1: Basic try/catch handling
async function fetchData() {
  try {
    const result = await fakeNetworkCall();
    console.log("Fetch success:", result);
  } catch (err) {
    console.error("Fetch failed:", err.message);
  } finally {
    console.log("Cleanup: close connections or release resources");
  }
}

// Example 2: Retry pattern with exponential backoff
async function fetchWithRetry(retries = 3) {
  let attempt = 0;
  const baseDelay = 100;

  while (attempt < retries) {
    try {
      const result = await fakeNetworkCall(attempt < 2); // fail first 2 times
      console.log("Successful on attempt", attempt + 1, ":", result);
      return result;
    } catch (err) {
      attempt++;
      console.warn(`Attempt ${attempt} failed: ${err.message}`);
      if (attempt >= retries) throw err; // rethrow when maxed out
      const backoff = baseDelay * 2 ** attempt;
      console.log(`Retrying after ${backoff}ms...`);
      await new Promise((r) => setTimeout(r, backoff));
    }
  }
}

// Example 3: Transactional flow simulation
async function transactionalFlow() {
  let stage1Complete = false;
  try {
    console.log("Stage 1: write to database");
    stage1Complete = true;
    console.log("Stage 2: send email notification");
    await fakeNetworkCall(true); // force failure
    console.log("Stage 3: update metrics");
  } catch (err) {
    console.error("Transaction failed:", err.message);
    if (stage1Complete) {
      console.log("Rolling back Stage 1 changes...");
    }
  } finally {
    console.log("Finalizing transaction flow");
  }
}

// Run all examples sequentially
(async () => {
  await fetchData();
  try {
    await fetchWithRetry();
  } catch (e) {
    console.error("All retries failed:", e.message);
  }
  await transactionalFlow();
})();

/*
Notes:
- try/catch around awaited calls mirrors synchronous exception flow, improving readability.
- Distinguish retryable transient errors (e.g., network) from permanent logic errors.
- Use finally for guaranteed cleanup in all outcomes.
- Implement exponential backoff and retry caps for reliability under failure.
- Common in production: API calls, database writes, distributed workflows.
*/