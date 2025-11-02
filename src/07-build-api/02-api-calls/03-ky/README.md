# HTTP Client: ky

**Goal:** Learn how to use 'ky', a modern, lightweight, and ESM-only HTTP client built on top of the native 'fetch' API.

---

## Structure
03-ky/
├─ 01-ky-get.js
├─ 02-ky-post.js
└─ 03-ky-error-handling.js

---

## Key Concepts

| Feature | Description |
|:---|:---|
| **`fetch` Wrapper** | 'ky' simplifies the native 'fetch' API by providing a cleaner syntax. |
| **Auto-Error Handling** | Automatically throws an `HTTPError` for 4xx/5xx responses (unlike native `fetch`). |
| **`json` Option** | Automatically stringifies the `json` body and sets the `Content-Type` header. |
| **`HTTPError` Class** | Provides a specific error class (`instanceof HTTPError`) for robust error handling. |
| **ESM-Only** | This is a modern library that does not support CommonJS (`require`). |

---

## Takeaways
- 'ky' is a **convenience** library. It saves you from writing "boilerplate" code (like `!res.ok` checks or `JSON.stringify`).
- It is a great choice for modern ESM-based projects where a small dependency is acceptable.
- Understanding `ky` means understanding the "trade-off" of adding a dependency to gain developer convenience.

---

## How to Run
First, install the package:
```bash
npm install ky
node src/07-build-api/02-api-calls/03-ky/01-ky-get.js
node src/07-build-api/02-api-calls/03-ky/03-ky-error-handling.js
```