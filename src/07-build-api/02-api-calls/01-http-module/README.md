# HTTP-MODULE (Building a Web Server)

**Goal:** Master the built-in Node.js http module to create a web server from scratch. The primary goal is to understand the low-level mechanics and "pain points" that modern frameworks like Express are designed to solve.

## Structure
- `01-basic-server.js` - The core http.createServer loop and server.listen.
- `02-req-res-objects.js` - Inspecting the req (url, method) and manually building the res (status, headers).
- `03-basic-routing.js` - The "Pain Point" #1: Manual routing using if/else on req.url.
- `04-handling-post-data.js` - The "Pain Point" #2: Manual stream/buffer parsing for POST request bodies.

## Key Takeaways
- The http module is the low-level engine; it provides no router, no middleware, and no body parser.

- We are responsible for all parts of the response: Status Codes (200, 404) and Headers (Content-Type).

- POST data arrives as a stream; we must listen for data chunks (Buffers), concat them, and parse them manually.

- The complexity of 03-basic-routing.js and 04-handling-post-data.js is the #1 reason frameworks like Express are the industry standard.

## How to Run
Each example is a standalone server. Run one file in your terminal to start it:

```bash
node src/07-build-api/02-api-calls/01-http-module/01-basic-server.js