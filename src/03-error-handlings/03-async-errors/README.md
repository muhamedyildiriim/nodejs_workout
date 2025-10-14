# Async Errors

**Goal:** Learn how to detect, handle, and prevent errors in asynchronous JavaScript code.

Async code doesn’t fail immediately — it fails *later*.  
This section covers how to safely catch errors from Promises, async/await, and global runtime events.

---

## Structure
03-async-errors/
├─ 01-sync-errors.js
├─ 02-async-errors.js
├─ 03-promise-rejections.js
├─ 04-unhandled-rejections.js
└─ 05-uncaught-exceptions.js

---

## Key Concepts

| Type | Description | Prevention |
|------|--------------|-------------|
| **Synchronous Errors** | Occur immediately (e.g., ReferenceError, TypeError) | Wrap risky code in `try/catch` |
| **Async Promise Errors** | Fail later (network, file, API) | Use `.catch()` or async/await with `try/catch` |
| **Unhandled Rejections** | Missing `.catch()` in Promise chain | Always attach error handlers |
| **Uncaught Exceptions** | Fatal errors not caught anywhere | Use `process.on('uncaughtException')` only for logging & shutdown |

---

## Takeaways
- Async code runs *later*, so try/catch only works inside the same async context.  
- Always handle both local and global rejections.  
- Never ignore async errors — they silently kill stability.

---

## Real-World Relevance
- Prevents “Unhandled Promise Rejection” crashes in production  
- Builds confidence in async flows (DB queries, API calls, queues)  
- Shows mastery of asynchronous JavaScript — a key backend skill

---

## How to Run
Each file can be executed directly:
```bash
node path/to/file.js
```