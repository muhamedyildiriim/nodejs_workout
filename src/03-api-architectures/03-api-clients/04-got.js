/**
 * File: /03-api-architectures/03-api-clients/04-got.js
 * Topic: API Architectures → API Clients → `got` (The "Robust" Choice)
 * Purpose: Demonstrates `got`, the "heavy-duty", "robust"
 * HTTP client for critical, high-performance tasks.
 *
 * "The Trade-Off" / "Why use this?":
 * - **Pro (The "Killer Feature"):** **Automatic Retries**.
 * If an API request fails (e.g., 503, network error), `got`
 * will *automatically* try again. This is "mission-critical" for building "robust" microservices.
 * - **Pro:** Excellent `Stream` API for large files.
 * - **Pro:** Solves all "pain points" (auto-errors, auto-JSON).
 * - **Con:** "Overkill" for simple `GET` requests.
 * - **Con:** ESM-only (like `ky`).
 *
 * Install: npm install got
 * Run: node src/03-api-architectures/03-api-clients/04-got.js
 * Expected:
 * - "GET Demo:" Logs the title.
 * - "Error Demo:" Logs "Got HTTPError: Response code 404 (Not Found)"
 * - (Retry demo is conceptual)
 */

import got, { HTTPError } from "got";

const API_URL = "https://jsonplaceholder.typicode.com";

async function runGotDemo() {
  // --- 1. GET Request (Similar to `ky`) ---
  console.log("--- `got` GET Demo ---");
  try {
    // `.json()` chain works just like `ky`
    const todo = await got.get(`${API_URL}/todos/1`).json();
    console.log("GET Demo:", todo.title);
  } catch (err) {
    console.error("GET Demo Error:", err.message);
  }

  // --- 2. The "Robust" Choice ---
  console.log("\n--- `got` Retry Demo (Conceptual) ---");
  try {
    // This server *will fail* (e.g., 503 Service Unavailable)
    const flakyApiUrl = "https://httpstat.us/503";

    // `got` will *automatically* retry this request
    // (e.g., 2 times by default) before finally throwing an error.
    const data = await got(flakyApiUrl, {
      retry: {
        limit: 3, // Try a total of 3 times
        methods: ["GET", "POST"], // Retry on these methods
        statusCodes: [500, 502, 503, 504], // Only retry on server errors
      },
    }).json();
  } catch (err) {
    if (err instanceof HTTPError) {
      console.log(
        "Retry Demo (Expected): Got an HTTPError after 3 retries.",
        err.message
      );
    } else {
      console.log("Retry Demo (Network Error):", err.message);
    }
  }

  // --- 3. Error Handling Demo (404) ---
  console.log("\n--- `got` Error Demo (404) ---");
  try {
    // `got` *will not* retry a 404 (it's a client error, not a server failure)
    await got.get(`${API_URL}/todos/999999`).json();
  } catch (err) {
    if (err instanceof HTTPError) {
      console.error("Error Demo (Expected):", err.message);
    } else {
      console.error("Error Demo (Network):", err.message);
    }
  }
}

runGotDemo();