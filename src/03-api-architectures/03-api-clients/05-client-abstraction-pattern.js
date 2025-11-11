/**
 * File: /03-api-architectures/03-api-clients/05-client-abstraction-pattern.js
 * Topic: API Architectures → API Clients → The "Abstraction" Pattern
 * Purpose: This is the **"Mastery" code**. It demonstrates the solution for using *any* client (`fetch`, `axios`, `ky`)
 * in a "robust" and "maintainable" way.
 *
 * "The Architecture":
 * - **The Problem:** If we use `axios.get()` in 100 different files,
 * and we later decide to switch to `ky`, we must change *100 files*.
 * This is "brittle" and "tightly-coupled".
 * - **The Solution: "The Kitchen" Analogy**
 * - We create *one* file (this file, `api-client.js`) that
 * *hides* the tool (`axios`/`ky`/`fetch`).
 * - This "client" handles all the central concerns: `process.env.BASE_URL`, `Authorization` headers,
 * timeouts, and which tool is being used.
 * - The *rest of our application* *only*
 * imports `apiClient` from this file. It *never* imports `axios` directly.
 * - **The "Win" :** If we want to swap `axios` for `ky`,
 * we *only change this one file*.
 *
 * Install: npm install axios dotenv
 * Run:
 * 1. Create a `.env` file in the *project root*
 * 2. Add: `JSONPLACEHOLDER_BASE_URL="https://jsonplaceholder.typicode.com"`
 * 3. node src/03-api-architectures/03-api-clients/05-client-abstraction-pattern.js
 * Expected:
 * - Logs the title of todo #1, fetched using the *abstracted client*.
 */

import axios from "axios";
import "dotenv/config";

// --- 1. The Setup (The Kitchen) ---

// Load the "Infrastructure" config from `process.env`
const API_BASE_URL = process.env.JSONPLACEHOLDER_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "JSONPLACEHOLDER_BASE_URL is not set in your .env file."
  );
}

// Create *one* central, pre-configured tool instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 5 second timeout
  headers: {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${process.env.API_KEY}` // (If we had one)
  },
});

// We could add "Interceptors" here for logging, etc.
apiClient.interceptors.request.use((config) => {
  console.log(`(API Client): Sending request to ${config.url}`);
  return config;
});

// --- 2. The "Service Layer" (The "Public Menu") ---
// The rest of our app *only* uses this `todoService`.
// It does *not* know `axios` exists.
export const todoService = {
  getTodoById: async (id) => {
    try {
      // Note: We use the *relative* path (`/todos/1`)
      // `baseURL` is handled *automatically* by the client.
      const response = await apiClient.get(`/todos/${id}`);
      return response.data; // `axios` puts data here
    } catch (err) {
      console.error(`Error fetching todo ${id}:`, err.message);
      throw err; // Re-throw for the caller to handle
    }
  },

  createTodo: async (title) => {
    const newTodo = { title, userId: 1, completed: false };
    const response = await apiClient.post("/todos", newTodo);
    return response.data;
  },
};

// --- 3. The "Application" (The "Customer") ---
// This code *doesn't know* if we are using `axios` or `ky` or `fetch`.
// It only knows about `todoService`.
async function main() {
  console.log("--- Running the 'Abstraction Pattern' Demo ---");
  try {
    const todo = await todoService.getTodoById(1);
    console.log("\nDemo Result (Todo #1):", todo.title);
  } catch (err) {
    console.error("Demo failed.");
  }
}

main();

// Notes:
// - This "Abstraction" is the *most important* Concept in this section.
// - It creates "low coupling" and "high maintainability".