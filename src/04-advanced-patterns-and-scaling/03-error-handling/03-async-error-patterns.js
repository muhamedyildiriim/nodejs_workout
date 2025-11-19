/**
 * File: /04-advanced-patterns-and-scaling/03-error-handling/03-async-error-patterns.js
 * Topic: Advanced Patterns → Error Handling → Async `try/catch` vs. `unhandledRejection`
 * Purpose: Demonstrates the difference-making concept for handling errors in `async` code.
 *
 * Key Points:
 * - **`async/await` + `try...catch`:** This is the modern tool. It's clean and works like "sync" code.
 * - **`promise.catch()`:** The "Classic" tool.
 * Still necessary.
 * - **"The 'Sin'":** An "unhandled rejection".
 * This happens when a Promise `reject`s, but there is *no* `.catch()`
 * or `try...catch` block to handle it.
 * - **"The Safety Net":** `process.on('unhandledRejection', ...)`
 * This is a "global" (global) "catch-all" (`process`) "Alet"i (Tool) to catch "Programmer Errors" (e.g., a missing `.catch()`) and **crash
 * the server safely** (because the state is now "unknown").
 *
 * Run: node src/04-advanced-patterns-and-scaling/03-error-handling/03-async-error-patterns.js
 * Expected:
 * - "1. (try/catch) Success:"
 * - "2. (try/catch) Handled Error:"
 * - "3. (.catch) Handled Error:"
 * - "4. (UNHANDLED) CRITICAL: Unhandled Rejection! Shutting down..."
 */

// --- 1. The "Safety Net" ---
// This `process` tool listens for *any* Promise
// that fails without a `.catch()` block.
process.on("unhandledRejection", (reason, promise) => {
  console.log("\n--- The 'Safety Net' Caught an Error! ---");
  console.error(
    "4. (UNHANDLED) CRITICAL: Unhandled Rejection! Shutting down..."
  );
  console.error("Reason:", reason.message);
  // This is a "Programmer Error".
  // The state is "unknown". We *must* crash.
  process.exit(1);
});
// ----------------------------------------------------

// A function that returns a Promise
const willSucceed = () => Promise.resolve("Success!");
const willFail = () => Promise.reject(new Error("Operation Failed!"));

// --- 1. Async/Await (Success) ---
async function handleSuccess() {
  try {
    const result = await willSucceed();
    console.log("1. (try/catch) Success:", result);
  } catch (err) {
    //
  }
}

// --- 2. Async/Await (Failure) ---
async function handleFailureWithTryCatch() {
  console.log("\n2. (try/catch) Testing `try/catch`...");
  try {
    const result = await willFail(); // This will throw
  } catch (err) {
    console.log("2. (try/catch) Handled Error:", err.message);
  }
}

// --- 3. .catch() (Failure) ---
function handleFailureWithCatch() {
  console.log("\n3. (.catch) Testing `.catch()`...");
  willFail().catch((err) => {
    // This `.catch()` "handles" the rejection.
    console.log("3. (.catch) Handled Error:", err.message);
  });
}

// --- 4. The "Sin" (Unhandled Rejection) ---
function causeTheSin() {
  console.log("\n4. (UNHANDLED) Causing an unhandled rejection...");
  // This Promise fails, but *nothing* is waiting
  // to `.catch()` it. The `process.on('unhandledRejection')`
  // "Safety Net" will catch this.
  willFail();
}

(async () => {
  await handleSuccess();
  await handleFailureWithTryCatch();
  handleFailureWithCatch();
  causeTheSin();
})();