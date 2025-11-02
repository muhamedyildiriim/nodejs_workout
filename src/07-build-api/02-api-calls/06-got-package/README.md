# HTTP Client: got

**Goal:** Learn how to use 'got', a powerful, "heavy-duty" HTTP client for Node.js, designed for robust and fault-tolerant applications.

---

## Structure
06-got-package/
├─ 01-got-get.js
├─ 02-got-post.js
└─ 03-got-error-handling.js

---

## Key Concepts

| Feature | Description |
|:---|:---|
| **Automatic Retries** | **KEY FEATURE:** `got` automatically retries on network failures or 5xx server errors. |
| **ESM-Only** | Like 'ky', the latest versions of `got` are ESM-only. |
| **`json` Option** | Provides the same convenience as `ky` for auto-handling JSON payloads. |
| **`HTTPError` / `RequestError`** | Provides clear, distinct error classes to differentiate between server errors and network errors. |
| **Advanced Features** | Built-in support for HTTP/2, pagination, and advanced streams. |

---

## Takeaways
- You choose `got` when **reliability** is more important than bundle size or simplicity.
- The automatic retry feature is invaluable for building robust microservices that must communicate with each other.
- `got` is the "senior" choice for complex, server-to-server interactions where failures are expected and must be handled.

---

## How to Run
First, install the package:
```bash
npm install got
```