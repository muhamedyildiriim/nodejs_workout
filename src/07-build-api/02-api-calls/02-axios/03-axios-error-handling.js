/**
 * Topic: Build API → API Calls → Axios → Advanced Error Handling
 * Purpose: Demonstrates how to properly catch and inspect errors from Axios.
 * Key Points:
 * - Axios errors (for 4xx/5xx responses) are structured objects.
 * - `error.response`: Contains the full response from the server (status, data, headers).
 * - `error.request`: Contains the request object that was sent (if no response was received).
 * - `error.message`: A general error message.
 * - Always check `if (error.response)` to handle HTTP errors specifically.
 * Run: node src/07-build-api/02-api-calls/02-axios/03-axios-error-handling.js
 * Expected:
 * - "HTTP Error:"
 * - "Status: 404"
 * - "Data: {}" (JSONPlaceholder returns an empty object for a 404)
 */

import axios from "axios";

// This URL does not exist, so it will return a 404 error.
const NON_EXISTENT_URL = "https://jsonplaceholder.typicode.com/todos/9999999";

const fetchInvalidTodo = async () => {
  try {
    await axios.get(NON_EXISTENT_URL);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("HTTP Error:");
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      // (e.g., network error, DNS lookup failure, server down)
      console.error("Network or No-Response Error:", error.message);
    } else {
      // Something happened in setting up the request that triggered an Error
      // (e.g., invalid configuration)
      console.error("Axios Setup Error:", error.message);
    }
  }
};

fetchInvalidTodo();

/*
Notes:
- This structured error handling is a hallmark of robust applications.
- In a real app, you would log these errors to a monitoring service (like Sentry or Datadog).
- Distinguishing between server errors (error.response) and network/client
  errors (error.request) is crucial for providing good user feedback.
*/