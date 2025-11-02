/**
 * Topic: Build API → API Calls → got → Advanced Error Handling
 * Purpose: Demonstrates how 'got' handles HTTP errors vs. Network errors.
 * Key Points:
 * - We import `HTTPError` and `RequestError` to identify error types.
 * - `HTTPError` (like 404, 503): The server responded, but with a bad status.
 * - `RequestError` (like DNS fail, timeout): The request itself failed.
 * - 'got' *automatically retries* on `RequestError` and 5xx `HTTPError`s.
 * Run: node src/07-build-api/02-api-calls/06-got/03-got-error-handling.js
 * Expected:
 * - "HTTP Error:"
 * - "Status: 404"
 * - "Body: {}" (JSONPlaceholder returns an empty object for a 404)
 */

import got, { HTTPError, RequestError } from "got";

// This URL does not exist, so it will return a 404 error.
const NON_EXISTENT_URL = "https://jsonplaceholder.typicode.com/todos/9999999";

const fetchInvalidTodo = async () => {
  try {
    await got.get(NON_EXISTENT_URL).json();
  } catch (error) {
    if (error instanceof HTTPError) {
      // The server responded with a 4xx or 5xx status code
      console.error("HTTP Error:");
      console.error("Status:", error.response.statusCode);
      // The body might be plain text or JSON (from the server's error)
      console.error("Body:", error.response.body);
    } else if (error instanceof RequestError) {
      // A network error, DNS lookup failure, timeout, etc.
      // 'got' would have *already retried* this before failing.
      console.error("Network/Request Error:", error.message);
    } else {
      // A generic error
      console.error("Generic Error:", error.message);
    }
  }
};

fetchInvalidTodo();

/*
Notes:
- This error handling is extremely robust.
- By default, 'got' *would* retry on a 503 error (Server Unavailable),
  but it *will not* retry on a 404 (Not Found) because 404 is a
  client-side error, not a temporary server failure.
- This intelligent default behavior is what makes 'got' a "senior-level" tool.
*/