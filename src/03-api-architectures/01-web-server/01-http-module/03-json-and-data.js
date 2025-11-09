/**
 * File: /03-api-architectures/01-web-server/01-http-module/03-json-and-data.js
 * Topic: API Architectures → Web Server → `http` Module (The "Pain" of JSON/POST)
 * Purpose: Demonstrates the "painful" way of *sending* JSON and *receiving* POST data manually.
 *
 * Key Points:
 * - **Sending JSON:** We must *manually* set the `Content-Type` header and `JSON.stringify()` our object.
 * - **Receiving JSON (The "Pain"):** We must *manually* listen for `req.on('data')` "chunks" (because the body is a `Stream`!) and re-assemble them from `Buffer`s.
 * - This is "low-level" and "error-prone".
 * - **This file proves *why* we need `res.json()` and `express.json()` (body-parser).**
 *
 * Run:
 * 1. node src/03-api-architectures/01-web-server/01-http-module/03-json-and-data.js
 * 2. GET `http://localhost:3000/api/user` (Use Browser or Postman)
 * 3. POST to `http://localhost:3000/api/user` with a JSON body:
 * `{"username": "my_user"}` (Must use Postman)
 *
 * Expected:
 * - The GET request returns a JSON object.
 * - The POST request echoes back the JSON you sent.
 */

import http from "node:http";

const PORT = 3000;

const requestListener = (req, res) => {
  const url = req.url;
  const method = req.method;

  // --- 1. The "Pain" of *Sending* JSON ---
  if (url === "/api/user" && method === "GET") {
    res.setHeader("Content-Type", "application/json"); // Manual Header
    res.statusCode = 200;
    const user = { id: 1, name: "John Doe" };
    res.end(JSON.stringify(user)); // Manual Stringify
    return;
  }

  // --- 2. The "Pain" of *Receiving* JSON (POST Data) ---
  if (url === "/api/user" && method === "POST") {
    let bodyChunks = [];

    // The request body is a `Stream`. We must "listen" for the data "chunks" (which are `Buffer`s).
    req.on("data", (chunk) => {
      bodyChunks.push(chunk);
    });

    // When the `Stream` is finished...
    req.on("end", () => {
      try {
        // We join all the `Buffer` "chunks" together
        const bodyBuffer = Buffer.concat(bodyChunks);
        // We convert the `Buffer` to a `string`
        const bodyString = bodyBuffer.toString("utf8");

        // We *manually* parse the JSON
        const parsedData = JSON.parse(bodyString);

        // Now we can finally use the data...
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 201; // 201 = "Created"
        res.end(
          JSON.stringify({
            message: "Data received",
            echo: parsedData,
          })
        );
      } catch (err) {
        res.statusCode = 400; // 400 = "Bad Request" (e.g., bad JSON)
        res.end(JSON.stringify({ error: "Invalid JSON format" }));
      }
    });
    return;
  }

  // Fallback 404
  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Not Found" }));
};

const server = http.createServer(requestListener);
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Notes:
// - This manual `req.on('data')` logic is the "Sin" that `express.json()` (body-parser) solves for us.
// - We are now ready to see the "Mimar" (Architect) solution: Express.js.