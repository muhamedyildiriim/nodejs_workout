# HTTP Client: Native \`fetch\`

**Goal:** Learn how to use the 'fetch' API that is **built-in** to Node.js (v18+). This is the "raw" tool that wrappers like 'ky' are built upon.

---

## Structure
05-fetch/
├─ 01-fetch-get.js
├─ 02-fetch-post.js
└─ 03-fetch-error-handling.js

---

## Key Concepts

| Feature | Description |
|:---|:---|
| **No Dependency** | This is part of Node.js. No `npm install` is needed. |
| **`response.ok`** | **CRITICAL:** `fetch` does *not* throw an error on 404/500. You *must* check `if (!response.ok)`. |
| **Manual Parsing** | You must manually call `response.json()` to parse the response body. |
| **Manual Body** | You must manually use `JSON.stringify()` for the `body` and set `Content-Type` headers for POSTs. |
| **Two Error Types** | 1. **Network Errors** (go to `catch`). 2. **HTTP Errors** (do *not* go to `catch`, `response.ok` is `false`). |

---

## Takeaways
- `fetch` gives you maximum control but requires you to write the most "boilerplate" code.
- Failing to check `!response.ok` is the #1 most common bug when using `fetch`.
- Learning `fetch` first helps you understand *why* libraries like `ky` and `axios` are so popular. They solve these "boilerplate" problems.

---

## How to Run
No installation is required. Run each example file directly:
```bash
node src/07-build-api/02-api-calls/05-fetch/01-fetch-get.js
node src/07-build-api/02-api-calls/05-fetch/03-fetch-error-handling.js
```