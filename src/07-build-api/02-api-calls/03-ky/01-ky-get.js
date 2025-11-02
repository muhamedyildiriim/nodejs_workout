/**
 * Topic: Build API → API Calls → ky → Basic GET Request
 * Purpose: Demonstrates fetching data using the 'ky' library.
 * Key Points:
 * - 'ky' is a modern, lightweight HTTP client based on the native `fetch` API.
 * - It's ESM-only, making it ideal for modern Node.js projects.
 * - `.json()` is the standard way to parse a JSON response.
 * Run: node src/07-build-api/02-api-calls/03-ky/01-ky-get.js
 * Expected:
 * - Logs the title of the first todo item from JSONPlaceholder.
 */

import ky from "ky";

const API_URL = "https://jsonplaceholder.typicode.com/todos/1";

const fetchTodo = async () => {
  try {
    // ky returns a promise that resolves to a Response object.
    // We can directly chain `.json()` to parse it.
    const todo = await ky.get(API_URL).json();

    console.log("Fetched Todo Title:", todo.title);
  } catch (error) {
    // 'ky' throws an 'HTTPError' for non-2xx responses by default.
    console.error("Error fetching data:", error.message);
  }
};

fetchTodo();

/*
Notes:
- The syntax is very clean compared to axios; `ky.get(url).json()` is a common pattern.
- Like axios, 'ky' automatically throws an error for status codes
  outside the 2xx range, saving you a manual `if (!response.ok)` check.
*/