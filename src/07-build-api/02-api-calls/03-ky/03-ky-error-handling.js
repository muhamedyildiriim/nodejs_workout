/**
 * Topic: Build API → API Calls → ky → Advanced Error Handling
 * Purpose: Demonstrates how to properly catch and inspect 'HTTPError' from 'ky'.
 * Key Points:
 * - 'ky' throws a specific `HTTPError` for 4xx/5xx responses.
 * - This error object is very powerful and contains the `response` object.
 * - We must import `HTTPError` to check the error type using `instanceof`.
 * - This allows us to parse the error response body from the server (e.g., validation errors).
 * Run: node src/07-build-api/02-api-calls/03-ky/03-ky-error-handling.js
 * Expected:
 * - "HTTP Error:"
 * - "Status: 404"
 * - "Response Body: {}" (JSONPlaceholder returns an empty object for a 404)
 */

import ky, { HTTPError } from "ky";

// This URL does not exist, so it will return a 404 error.
const NON_EXISTENT_URL = "https://jsonplaceholder.typicode.com/todos/9999999";

const fetchInvalidTodo = async () => {
  try {
    await ky.get(NON_EXISTENT_URL).json();
  } catch (error) {
    if (error instanceof HTTPError) {
      // This is a specific HTTP error (e.g., 404, 500, 401)
      console.error("HTTP Error:");
      console.error("Status:", error.response.status);

      // We can even parse the error response body from the server
      const errorBody = await error.response.json();
      console.error("Response Body:", errorBody);
    } else {
      // This is a network error (e.g., DNS failed, no connection)
      // or a 'ky' setup error.
      console.error("Network or Setup Error:", error.message);
    }
  }
};

fetchInvalidTodo();

/*
Notes:
- `axios`'un `error.response` ve `error.request` kontrolleri yerine
  `ky`'ın `instanceof HTTPError` kullanması daha modern bir JavaScript pratiğidir.
- `error.response` nesnesi, standart Fetch API `Response` nesnesidir.
*/