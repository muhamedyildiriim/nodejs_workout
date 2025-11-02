/**
 * Topic: Build API → API Calls → Native fetch → Error Handling Details
 * Purpose: Demonstrates the two types of errors 'fetch' can produce.
 * Key Points:
 * - 1. Network Error: The fetch() promise rejects (caught by try...catch).
 * (e.g., DNS lookup failed, no internet connection).
 * - 2. HTTP Error: The fetch() promise resolves (does NOT go to catch).
 * (e.g., 404 Not Found, 500 Server Error). `response.ok` will be false.
 * Run: node src/07-build-api/02-api-calls/05-fetch/03-fetch-error-handling.js
 * Expected:
 * - "Testing HTTP Error (404):"
 * - "HTTP Error! Status: 404"
 * - "Testing Network Error (Bad Domain):"
 * - "Network or Setup Error: ..." (e.g., fetch failed)
 */

// 1. A URL that will cause an HTTP Error (404)
const HTTP_ERROR_URL = "https://jsonplaceholder.typicode.com/todos/9999999";

// 2. A URL that will cause a Network Error (domain does not exist)
const NETWORK_ERROR_URL = "https://domain-does-not-exist-at-all.com";

const fetchInvalidTodo = async (url) => {
  try {
    const response = await fetch(url);

    // 2. HTTP Error (404, 500, 401...)
    // The promise resolved, so we are NOT in the 'catch' block.
    if (!response.ok) {
      // We manually throw an error to be handled.
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    // Success (will not be reached in this example)
    const data = await response.json();
    console.log("Success:", data);
  } catch (error) {
    // 1. Network Error (DNS, No Connection...)
    // 'fetch' ONLY rejects (enters 'catch') for this type of error.
    console.error("Network or Setup Error:", error.message);
  }
};

console.log("Testing HTTP Error (404):");
await fetchInvalidTodo(HTTP_ERROR_URL);

console.log("\nTesting Network Error (Bad Domain):");
await fetchInvalidTodo(NETWORK_ERROR_URL);

/*
Notes:
- This is the most confusing and most important feature of 'fetch'.
- 'axios' and 'ky' simplify this for us by standardizing both error types
  to always land in the 'catch' block.
*/