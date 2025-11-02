/**
 * Topic: Build API → API Calls → ky → Basic POST Request
 * Purpose: Demonstrates sending JSON data using ky.post()
 * Key Points:
 * - The `json` option is used to send a JSON payload.
 * - 'ky' automatically serializes the object and sets the 'Content-Type' header.
 * - We chain `.json()` to parse the server's JSON response.
 * Run: node src/07-build-api/02-api-calls/03-ky/02-ky-post.js
 * Expected:
 * - Logs the newly created post object, including its new 'id'.
 */

import ky from "ky";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const createPost = async () => {
  try {
    const newPostData = {
      title: "My New Post with ky",
      body: "This is the content of my new post.",
      userId: 1,
    };

    // Use the `json` property in the options object for the payload.
    const createdPost = await ky
      .post(API_URL, {
        json: newPostData,
      })
      .json();

    console.log("Created Post:", createdPost);
  } catch (error) {
    console.error("Error creating post:", error.message);
  }
};

createPost();

/*
Notes:
- The payload is passed in an options object, unlike axios's second argument.
- `ky.post(url, { json: payload })` is the standard way to send JSON.
- This approach is very explicit and readable.
*/