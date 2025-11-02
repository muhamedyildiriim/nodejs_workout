/**
 * Topic: Build API → API Calls → Native fetch → Basic POST Request
 * Purpose: Demonstrates sending JSON data using the built-in 'fetch' API.
 * Key Points:
 * - For POST requests, 'fetch' takes a second argument (an options object).
 * - `method: 'POST'` must be specified.
 * - The `body` must be manually stringified using `JSON.stringify()`.
 * - The `headers: { 'Content-Type': 'application/json' }` must be set manually.
 * Run: node src/07-build-api/02-api-calls/05-fetch/02-fetch-post.js
 * Expected:
 * - Logs the newly created post object.
 */

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const createPost = async () => {
  try {
    const newPostData = {
      title: "My New Post with fetch",
      body: "This is the content of my new post.",
      userId: 1,
    };

    const response = await fetch(API_URL, {
      method: "POST",
      // Unlike 'axios' or 'ky', we must manually stringify the body.
      body: JSON.stringify(newPostData),
      // ...and we must manually set the 'Content-Type' header.
      headers: {
        "Content-Type": "application/json",
      },
    });

    // The 'ok' check is also mandatory for POST requests.
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const createdPost = await response.json();
    console.log("Created Post:", createdPost);
    console.log("Status Code:", response.status); // 201
  } catch (error) {
    console.error("Error creating post:", error.message);
  }
};

createPost();

/*
Notes:
- 'axios' and 'ky' (with its `json` option) automate all of these
  `method`, `body`, and `headers` configurations for us.
- Using 'fetch' gives you full control, but requires writing more boilerplate code.
  This is another "trade-off".
*/