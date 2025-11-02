/**
 * Topic: Build API → API Calls → API Client Abstraction (The Pattern)
 * Purpose: Demonstrates abstracting the HTTP client ('ky') into a reusable,
 * configurable service layer. This is a foundational architectural pattern.
 * Key Points:
 * - **Separation of Concerns**: The "how" (ky, headers, base URLs) is hidden
 * from the "what" (getPostById).
 * - **Configuration**: Hardcoded values (Base URLs, API Keys) are moved
 * to environment variables (`process.env`) via 'dotenv'.
 * - **Reusability**: We create ONE 'ky' instance (`apiClient`) with default
 * options and reuse it everywhere.
 * - **Testability & Maintainability**: This pattern is easy to mock for tests.
 * If we switch from 'ky' to 'axios', we ONLY change this one file.
 *
 * Run:
 * 1. npm install dotenv ky
 * 2. Create a .env file in the project root with:
 * JSONPLACEHOLDER_API_BASE_URL=https://jsonplaceholder.typicode.com
 * 3. node src/07-build-api/02-api-calls/04-api-client-service/api-service.js
 *
 * Expected:
 * - "Fetched Post 1 Title: sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
 */

// Use `dotenv/config` to load .env variables immediately
import "dotenv/config";
import ky from "ky";

// --- 1. CONFIGURATION (The "Setup") ---

// Pull the Base URL from environment variables, not hardcoded.
const BASE_URL = process.env.JSONPLACEHOLDER_API_BASE_URL;

if (!BASE_URL) {
  // Fail fast if configuration is missing
  throw new Error("JSONPLACEHOLDER_API_BASE_URL is not set in .env file");
}

// --- 2. ABSTRACTION (The "Client Instance") ---

// Create ONE client instance that the whole app will use.
const apiClient = ky.create({
  prefixUrl: BASE_URL, // All requests will be prefixed with this
  headers: {
    "Content-Type": "application/json",
    // An API Key would go here, also from process.env
    // 'Authorization': `Bearer ${process.env.MY_API_KEY}`
  },
  timeout: 8000, // Set a reasonable timeout
});

// --- 3. SERVICE LAYER (The "Public Interface") ---
// The rest of our app (e.g., Express controllers) will ONLY use this object.
// It doesn't know 'ky' exists.

export const postService = {
  /**
   * Fetches a single post by its ID.
   * @param {string | number} id - The ID of the post to fetch.
   * @returns {Promise<object>} The post data.
   */
  getPostById: async (id) => {
    try {
      // We just use the path, not the full URL. 'apiClient' handles the rest.
      const post = await apiClient.get(`posts/${id}`).json();
      return post;
    } catch (error) {
      // We can add specific logging or error transformation here
      console.error(`Error fetching post ${id}:`, error.message);
      throw error; // Re-throw the error for the caller to handle
    }
  },

  /**
   * Creates a new post.
   * @param {object} postData - { title: string, body: string, userId: number }
   * @returns {Promise<object>} The newly created post data.
   */
  createPost: async (postData) => {
    try {
      const createdPost = await apiClient
        .post("posts", { json: postData })
        .json();
      return createdPost;
    } catch (error) {
      console.error(`Error creating post:`, error.message);
      throw error;
    }
  },
};

// --- 4. EXAMPLE USAGE (Simulating an app feature) ---

const main = async () => {
  try {
    const post = await postService.getPostById(1);
    console.log("Fetched Post 1 Title:", post.title);

    // const newPost = await postService.createPost({
    //   title: "My New Post",
    //   body: "This is a test.",
    //   userId: 10,
    // });
    // console.log("Created new post:", newPost);
  } catch (err) {
    console.error("Main function failed to run:", err.message);
  }
};

main();

/*
Notes:
- This file defines the *architecture*.
- If you want to switch to 'axios', you would change `ky.create` to
  `axios.create` and update the `.get` / `.post` methods.
- The rest of the application (like `postService.getPostById`) would
  not need to change. This is the goal of "loose coupling" and
  is a core principle of senior-level engineering.
*/