/**
 * Topic: Build API → API Calls → Axios → Basic GET Request
 * Purpose: Demonstrates fetching data from a public API using axios.get()
 * Key Points:
 * - axios is a promise-based HTTP client for the browser and node.js.
 * - axios.get(url) performs a GET request.
 * - The actual response data from the server is in the `response.data` property.
 * - Always use try...catch with async/await to handle potential errors.
 * Run: node src/07-build-api/02-api-calls/02-axios/01-axios-get.js
 * Expected:
 * - Logs the title of the first todo item from JSONPlaceholder.
 */

import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos/1";

const fetchTodo = async () => {
  try {
    // Await the promise returned by axios.get()
    const response = await axios.get(API_URL);

    // Axios wraps the response; server data is in `response.data`
    const todo = response.data;

    console.log("Fetched Todo Title:", todo.title);
  } catch (error) {
    // This block catches network errors or non-2xx HTTP status codes
    console.error("Error fetching data:", error.message);
  }
};

fetchTodo();

/*
Notes:
- axios automatically parses the JSON response, so no need for `response.json()`.
- Unlike the browser's fetch(), axios throws an error by default for any
  status code outside the 2xx range (e.g., 404, 500), which is convenient.
*/