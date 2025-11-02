/**
 * Topic: HTTP Module → 04 Handling POST Data (Streams)
 * Purpose: Demonstrates the "hard way" of receiving and parsing stream data.
 * Key Points:
 * - POST data (the "body") arrives as a "stream" of data chunks, not all at once.
 * - We must listen to the 'req.on('data', ...)' event to collect these chunks.
 * - The chunks are 'Buffer' objects. We collect them in an array.
 * - We must listen to 'req.on('end', ...)' to know when all data has arrived.
 * - On 'end', we use Buffer.concat() and .toString() to reassemble the full body.
 * - If the data is JSON, we must then 'JSON.parse()' the final string.
 * Run: node src/07-build-api/02-api-calls/01-http-module/04-handling-post-data.js
 * Test (in a separate terminal):
 * curl -X POST -H "Content-Type: application/json" -d "{\"name\":\"Alice\"}" http://localhost:3000/api
 * Expected:
 * - Server console logs: "Received data: { name: 'Alice' }"
 */

import http from "http";

const server = http.createServer((req, res) => {
  // We only care about POST requests to /api
  if (req.url === "/api" && req.method === "POST") {
    let body = []; // Array to store the data chunks (Buffers)

    // Listen for the 'data' event. This fires for each chunk.
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log("Receiving chunk...");
    });

    // Listen for the 'end' event. This fires when all data is received.
    req.on("end", () => {
      try {
        // 1. Concatenate all Buffers into one
        // 2. Convert the final Buffer to a string
        const bodyString = Buffer.concat(body).toString();
        
        // 3. Parse the string as JSON
        const parsedData = JSON.parse(bodyString);

        console.log("Received data:", parsedData);

        // Send a success response
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "success", received: parsedData }));

      } catch (error) {
        // Handle bad JSON
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "error", message: "Invalid JSON" }));
      }
    });

  } else {
    // Handle all other requests
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found. Try POSTing to /api");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running. Ready to receive POST data on /api`);
});

// Notes:
// - This is the core concept of Node.js streams. It's efficient but complex.
// - Body-parser libraries in frameworks (like Express) automate this entire process.
// - Understanding this is KEY to understanding why Node.js is "non-blocking".