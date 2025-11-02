/**
 * Topic: Build API → API Calls → got → Basic POST Request
 * Purpose: Demonstrates sending JSON data using got.post()
 * Key Points:
 * - Like 'ky', 'got' uses the `json` option to send a JSON payload.
 * - It automatically serializes the object and sets the 'Content-Type' header.
 * - We chain `.json()` to parse the server's JSON response.
 * Run: node src/07-build-api/02-api-calls/06-got/02-got-post.js
 * Expected:
 * - Logs the newly created post object.
 */

import got from "got";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const createPost = async () => {
  try {
    const newPostData = {
      title: "My New Post with got",
      body: "This is the content of my new post.",
      userId: 1,
    };

    // Use the `json` property in the options object for the payload.
    const createdPost = await got
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
- The `json` option makes sending JSON trivial, just like in 'ky'.
- This avoids the manual `JSON.stringify` and header-setting
  required by 'native-fetch'.
*/