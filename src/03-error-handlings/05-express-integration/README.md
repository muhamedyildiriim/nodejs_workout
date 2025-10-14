# Express Integration → Global Error Middleware

**Goal:** Learn how to centralize and standardize error handling in Express applications.

This section focuses on *Express error flow* — how route-level errors are **forwarded**, **logged**, and **safely returned** to clients without leaking sensitive details.

---

## Structure
03-error-handlings/
└─ 05-express-integration/
　　└─ 01-express-error-handling.js

---

## Key Concepts

| Concept | Description | Real-World Use |
|----------|--------------|----------------|
| **Global Error Middleware** | Central place to handle all errors in Express | Keeps routes clean and consistent |
| **Error Forwarding** | Use `next(err)` (or throw in async) to reach the handler | Makes async and sync routes uniform |
| **Safe Client Responses** | Never expose stack traces or internal messages | Prevents data leaks and improves UX |
| **Server Logging** | Log full details privately (console, Pino, Winston) | Enables debugging & production monitoring |

---

## Takeaways
- Use `next(err)` (or throw inside `async`) to route errors to the global handler.  
- Always log errors on the server, **never** expose stack traces to clients.  
- Default to `500` for unexpected errors; use custom classes for structured responses.  
- In production, integrate proper loggers (e.g. **Pino**, **Winston**) for observability.  

---

## Real-World Relevance
- Prevents unhandled errors from crashing your API.  
- Enables consistent error structures across routes and services.  
- Foundation for advanced topics like **custom error classes**, **validation errors**, and **monitoring hooks**.  

---

**Run:**
```bash
node src/03-error-handlings/05-express-integration/01-express-error-handling.js
```