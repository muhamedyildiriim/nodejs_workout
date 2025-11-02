/**
 * Topic: Build API → API Calls → Axios → Basic POST Request
 * Purpose: Demonstrates sending data to an API using axios.post()
 * Key Points:
 * - `axios.post(url, data)` sends a POST request to the specified URL.
 * - The `data` object (second argument) is automatically serialized to JSON.
 * - axios automatically sets the 'Content-Type: application/json' header.
 * Run: node src/07-build-api/02-api-calls/02-axios/02-axios-post.js
 * Expected:
 * - Logs the newly created post object, including its new 'id'.
 */

import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const createPost = async () => {
  try {
    const newPostData = {
      title: "My New Post",
      body: "This is the content of my new post.",
      userId: 1,
    };

    // The second argument is the payload (body) to send.
    const response = await axios.post(API_URL, newPostData);

    // The response.data often contains the newly created resource.
    console.log("Created Post:", response.data);
    console.log("Status Code:", response.status); // Will be 201 (Created)
  } catch (error) {
    console.error("Error creating post:", error.message);
  }
};

createPost();

/*
Notes:
- The `data` object is what becomes the request body.
- You can pass a third argument to axios.post() for custom configuration,
  such as headers: `axios.post(url, data, { headers: { 'X-Custom-Header': 'value' } })`
- JSONPlaceholder is a fake API; it doesn't actually save the post,
  but it simulates the response correctly (returning an object with an id).
*/