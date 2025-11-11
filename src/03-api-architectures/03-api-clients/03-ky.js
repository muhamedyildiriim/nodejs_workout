/**
 * File: /03-api-architectures/03-api-clients/03-ky.js
 * Topic: API Architectures → API Clients → `ky` (The "Modern" Choice)
 * Purpose: Demonstrates `ky`, the "modern", "lightweight"
 * HTTP client. It is `fetch`-native and ESM-only.
 *
 * "The Trade-Off" / "Why use this?":
 * - **Pro:** It's a "Best of Both Worlds" architect.
 * solution. It has the *simplicity* of `axios` (auto-errors,
 * auto-JSON) but is *built on top of* `native-fetch`.
 * - **Pro:** Very clean `.json()` chaining (zincirleme) API.
 * - **Pro:** Throws a specific `HTTPError` class, which is great
 * for `instanceof` error checking.
 * - **Con:** ESM-only. Cannot be used in "Classic" CommonJS (`require`) projects.
 *
 * Install: npm install ky
 * Run: node src/03-api-architectures/03-api-clients/03-ky.js
 * Expected:
 * - "GET Demo:" Logs the title.
 * - "POST Demo:" Logs the new post object.
 * - "Error Demo:" Logs "Ky HTTPError: HTTPError: Request failed with status code 404"
 */

import ky, { HTTPError } from "ky";

const API_URL = "https://jsonplaceholder.typicode.com";

async function runKyDemo() {
  // --- 1. GET Request (Super clean) ---
  console.log("--- `ky` GET Demo ---");
  try {
    // We can chain `.json()` directly to the request.
    const todo = await ky.get(`${API_URL}/todos/1`).json();
    console.log("GET Demo:", todo.title);
  } catch (err) {
    console.error("GET Demo Error:", err.message);
  }

  // --- 2. POST Request (Super clean) ---
  console.log("\n--- `ky` POST Demo ---");
  try {
    const newPost = { title: "My Ky Post", body: "This is elegant.", userId: 1 };
    // We use the `json` property in the options object.
    const createdPost = await ky.post(`${API_URL}/posts`, { json: newPost }).json();
    console.log("POST Demo:", createdPost);
  } catch (err) {
    console.error("POST Demo Error:", err.message);
  }

  // --- 3. Error Handling Demo (404) ---
  console.log("\n--- `ky` Error Demo (404) ---");
  try {
    // `ky` *automatically* throws an `HTTPError`.
    const response = await ky.get(`${API_URL}/todos/999999`).json();
  } catch (err) {
    // We can check the error *type*
    if (err instanceof HTTPError) {
      console.error("Error Demo (Expected):", `Ky HTTPError: ${err.message}`);
      // console.error("Status:", err.response.status); // 404
    } else {
      console.error("Error Demo (Network):", err.message);
    }
  }
}

runKyDemo();