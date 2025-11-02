# The Lessons & The "Pain Points"
Each file in this directory is designed to teach one concept and reveal one major "pain point."

1. `01-basic-server.js`
- **What it does:** Creates the simplest possible web server. It responds with "Hello World!" to every request.

- **The Lesson:** This shows the core http.createServer and server.listen loop. It's the "engine" of Node.js web applications.

The "Pain" (Implied): It's too simple. It treats all requests (/, /about, /api, /favicon.ico) exactly the same. This is not useful for a real application.


2. `02-req-res-objects.js`
- **What it does:** Shows how to inspect the req (request) object and manually build a res (response) object with headers.

- **The Lesson:** We are responsible for everything. We must manually set the HTTP status code (e.g., 200) and the Content-Type header (e.g., text/plain).

The "Pain" (Implied): If we forget to set Content-Type, the browser might misinterpret our data. If we forget to set the right status code, we create bugs. Manually managing this for every response is tedious.


3. `03-basic-routing.js`
- **What it does:** Uses a giant if/else if/else block to check req.url and serve different content for different pages.

- **The Lesson:** This is how you manually create a "router."

THE PAIN POINT (Açık ve Net): This is our first major "pain point." This if/else logic is unscalable.

What if you have 50 routes? This file would be a 1000-line monster.

How would you handle dynamic routes like /users/123? You would need complex regular expressions (regex) to parse the URL.

The Framework Solution: This entire, ugly if/else block is the problem that an Express Router (app.get('/', ...), app.get('/about', ...) ) solves elegantly.


4. `04-handling-post-data.js`
- **What it does:** Demonstrates the complex, multi-step process of receiving POST data (like a JSON payload from an API request).

- **The Lesson:** This is the "hard way" to handle incoming data. It's stream-based.

- **THE PAIN POINT:** This is the most critical lesson in the entire folder. To get a simple JSON object, we must manually:

* Listen for the 'data' event.

* Collect the chunks (which are Buffers) in an array.

* Listen for the 'end' event.

* Concatenate the buffers (Buffer.concat).

* Convert the final buffer to a string (.toString()).

* Parse the string into JSON (JSON.parse).

* Wrap this entire process in a try...catch block in case the JSON is invalid.

* The Framework Solution: This entire 30-line file is replaced by a single line in Express:

```bash
app.use(express.json());
```
After this, the parsed data is automatically and safely available at req.body for all your routes.