/**
 * File: /03-api-architectures/03-api-clients/02-axios.js
 * Topic: API Architectures → API Clients → `axios` (The "Classic" Choice)
 * Purpose: Demonstrates `axios`, the "classic", "battle-tested" HTTP client for Node.js.
 *
 * "The Trade-Off" / "Why use this?":
 * - **Pro:** Solves all `fetch` "pain points":
 * - 1. *Automatically* throws errors on 4xx/5xx (e.g., 404, 500).
 * - 2. *Automatically* stringifies the `body` for POSTs.
 * - 3. *Automatically* sets `Content-Type: application/json`.
 * - 4. *Automatically* parses the JSON response (data is in `response.data`).
 * - **Pro:** `Interceptors` are a powerful architect
 * feature for handling auth (e.g., `Authorization` header)
 * and logging in one central place.
 * - **Con:** Adds a dependency. It is not `fetch`-native.
 *
 * Install: npm install axios
 * Run: node src/03-api-architectures/03-api-clients/02-axios.js
 * Expected:
 * - "GET Demo:" Logs the title.
 * - "POST Demo:" Logs the new post object.
 * - "Error Demo:" Logs "Axios Error: Request failed with status code 404"
 */

import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

async function runAxiosDemo() {
  // --- 1. GET Request (Clean and simple) ---
  console.log("--- `axios` GET Demo ---");
  try {
    // `axios` handles all the "pain points" automatically.
    const response = await axios.get(`${API_URL}/todos/1`);
    // The *actual data* is in `response.data`.
    console.log("GET Demo:", response.data.title);
  } catch (err) {
    console.error("GET Demo Error:", err.message);
  }

  // --- 2. POST Request (Clean and simple) ---
  console.log("\n--- `axios` POST Demo ---");
  try {
    const newPost = { title: "My Axios Post", body: "This is easy.", userId: 1 };
    // We just pass the object as the second argument.
    // `axios` handles stringify and headers automatically.
    const response = await axios.post(`${API_URL}/posts`, newPost);
    console.log("POST Demo:", response.data);
  } catch (err) {
    console.error("POST Demo Error:", err.message);
  }

  // --- 3. Error Handling Demo (404) ---
  console.log("\n--- `axios` Error Demo (404) ---");
  try {
    // `axios` *automatically* throws an error for 404.
    // No `if (!response.ok)` check is needed.
    const response = await axios.get(`${API_URL}/todos/999999`);
  } catch (err) {
    // `err.response` contains the server's error details.
    console.error("Error Demo (Expected):", err.message);
    // console.error("Error Details:", err.response?.status); // 404
  }
}

runAxiosDemo();