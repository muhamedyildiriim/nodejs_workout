/**
 * Topic: Build API → API Calls → Native fetch → Basic GET Request
 * Purpose: Demonstrates fetching data using the built-in 'fetch' API.
 * Key Points:
 * - 'fetch' is built-in to Node.js (v18+) - no install needed.
 * - fetch() returns a promise that resolves to a 'Response' object.
 * - You must manually parse the body, e.g., using `response.json()`.
 * - 'fetch' DOES NOT throw an error for 4xx/5xx responses. You MUST check.
 * Run: node src/07-build-api/02-api-calls/05-fetch/01-fetch-get.js
 * Expected:
 * - Logs the title of the first todo item.
 */

const API_URL = "https://jsonplaceholder.typicode.com/todos/1";

const fetchTodo = async () => {
  try {
    const response = await fetch(API_URL);

    // !! CRITICAL DIFFERENCE !!
    // 'fetch' does not throw an error on bad HTTP statuses (like 404 or 500).
    // We must manually check the 'response.ok' (true/false) property.
    if (!response.ok) {
      // We manually throw an error so the 'catch' block can handle it.
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // If the response is 'ok', we manually parse the JSON.
    const todo = await response.json();

    console.log("Fetched Todo Title:", todo.title);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

fetchTodo();

/*
Notes:
- This is a more "raw" or "low-level" usage compared to 'ky' or 'axios'.
- Skipping the `response.ok` check is a common bug that is hard to find.
- 'ky' simplifies our life by automating this `!response.ok` check and the
  `response.json()` step. This is a classic "trade-off".
*/