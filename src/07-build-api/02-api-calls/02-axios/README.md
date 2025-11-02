# API Calls: Axios

**Goal:** Master how to perform and manage external HTTP requests in Node.js using the `axios` library. This includes making different types of requests (GET, POST) and implementing robust, production-ready error handling.

## Structure
- `01-axios-get.js`: Demonstrates a fundamental `GET` request to fetch data from a public API.
- `02-axios-post.js`: Demonstrates how to send a `POST` request with a JSON payload to create a new resource.
- `03-axios-error-handling.js`: Covers the critical patterns for correctly handling both HTTP status errors (4xx, 5xx) and network/request-level errors.

## Key Takeaways
- `axios` is promise-based. In modern usage, all requests should be wrapped in a `try...catch` block using `async/await`.
- The actual data from a successful response is located in the `response.data` object.
- Methods like `axios.post(url, data)` automatically serialize the JavaScript object passed as the second argument into JSON and set the `Content-Type` header.

- **Most Critical Point:** Error handling is vital. Checking within a `catch (error)` block whether a response was received from the server (`error.response`) or if the request failed to be sent (`error.request`) is a key differentiator between junior and senior developers.

## How to Run
Before running the examples in this directory, you must install `axios`:

```bash
npm install axios
node src/07-build-api/02-api-calls/02-axios/01-axios-get.js