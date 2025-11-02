/**
 * Topic: Build API → API Calls → got → Basic GET Request
 * Purpose: Demonstrates a simple GET request using the 'got' library.
 * Key Points:
 * - 'got' is a powerful, modern HTTP client, ESM-only in its latest versions.
 * - It is promise-based. `.json()` is the easiest way to fetch and parse.
 * - Like 'ky' and 'axios', 'got' automatically throws on 4xx/5xx errors.
 * - It also has powerful built-in features like automatic retries.
 * Run: node src/07-build-api/02-api-calls/06-got-package/01-got-get.js
 * Expected:
 * - Logs the title of the first todo item.
 */

import got from "got";

const API_URL = "https://jsonplaceholder.typicode.com/todos/1";

const fetchTodo = async () => {
  try {
    // .json() returns a promise that resolves with the parsed JSON body
    const todo = await got.get(API_URL).json();

    console.log("Fetched Todo Title:", todo.title);
  } catch (error) {
    // 'got' throws on HTTP errors, so this catch block will handle them.
    console.error("Error fetching data:", error.message);
  }
};

fetchTodo();

/*
Notes:
- The `.json()` method is a convenience that combines fetching and parsing.
- This syntax is very similar to 'ky', but 'got' has much more
  power under the hood (e.g., built-in retry mechanisms).
*/