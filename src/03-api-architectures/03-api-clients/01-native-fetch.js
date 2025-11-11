/**
 * File: /03-api-architectures/03-api-clients/01-native-fetch.js
 * Topic: API Architectures → API Clients → `native-fetch` (The "Baseline")
 * Purpose: Demonstrates the "raw" (ham), built-in Node.js (v18+) `fetch` API.
 * This is the "baseline" we compare other "Tools" against.
 *
 * Key Points (The "Pain Points"):
 * - **Pro:** No dependencies. It's built-in.
 * - **Con (The "Sin"):** `fetch` does **NOT** throw an error on
 * 4xx/5xx responses (e.g., 404, 500). You *must* manually
 * check `if (!response.ok)`.
 * - **Con:** You must *manually* `JSON.stringify()` the `body` for POSTs.
 * - **Con:** You must *manually* set the `Content-Type: application/json` header.
 * - **Con:** You must *manually* call `response.json()` to parse the response.
 *
 * Run: node src/03-api-architectures/03-api-clients/01-native-fetch.js
 * Expected:
 * - "GET Demo:" Logs the title of the first todo.
 * - "POST Demo:" Logs the new post object.
 * - "Error Demo:" Logs "HTTP Error! Status: 404"
 */

import "dotenv/config"; // (Used for consistency, though not required here)

const API_URL = "https://jsonplaceholder.typicode.com";

async function runFetchDemo() {
  // --- 1. GET Request (The "Manual" Way) ---
  console.log("--- Native `fetch` GET Demo ---");
  try {
    const response = await fetch(`${API_URL}/todos/1`);

    // **The "Sin" / Pain Point 1: Manual Error Check**
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    // Pain Point 2: Manual JSON parsing
    const todo = await response.json();
    console.log("GET Demo:", todo.title);
  } catch (err) {
    console.error("GET Demo Error:", err.message);
  }

  // --- 2. POST Request (More "Manual" Work) ---
  console.log("\n--- Native `fetch` POST Demo ---");
  try {
    const newPost = { title: "My Fetch Post", body: "This is raw.", userId: 1 };
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      // Pain Point 3: Manual stringify
      body: JSON.stringify(newPost),
      // Pain Point 4: Manual header
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const createdPost = await response.json();
    console.log("POST Demo:", createdPost);
  } catch (err) {
    console.error("POST Demo Error:", err.message);
  }

  // --- 3. Error Handling Demo (404) ---
  console.log("\n--- Native `fetch` Error Demo (404) ---");
  try {
    const response = await fetch(`${API_URL}/todos/999999`); // This 404s
    // We *must* check `response.ok` or this will not be caught.
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data = await response.json(); // This line won't run
  } catch (err) {
    console.error("Error Demo:", err.message);
  }
}

runFetchDemo();

// Notes:
// - `axios` and `ky` are "convenience wrappers" that *solve* all these "manual" pain points.