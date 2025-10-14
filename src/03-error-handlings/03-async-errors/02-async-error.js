/**
 * Topic: Error Handling → Async Errors → Promises and Async/Await
 * Purpose: Demonstrates how asynchronous operations produce errors that appear later in the event loop.
 * Key Points:
 *  - Promises handle errors via .catch()
 *  - async/await uses try/catch for cleaner syntax
 *  - Missing .catch() results in “Unhandled Promise Rejection”
 * Run: node src/03-error-handlings/03-async-errors/02-async-error.js
 * Expected:
 *  - Logs handled errors from both Promise and async/await examples
 */

//
// Promise-based async error
//
fetch("https://api.fakeurl.com")
  .then((res) => res.json())
  .then((data) => console.log("Data:", data))
  .catch((err) => console.error("Promise error:", err.message));

//
// Async/Await-based async error
//
async function getData() {
  try {
    const res = await fetch("https://api.fakeurl.com");
    const data = await res.json();
    console.log("Data:", data);
  } catch (err) {
    console.error("Async/Await error:", err.message);
  }
}

getData();

// Notes:
// - Promises handle async results; use .catch() for rejections.
// - async/await syntax simplifies this but still needs try/catch.
// - Always handle async errors to prevent runtime crashes.