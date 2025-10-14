# Error Categories

**Goal:** Learn how to classify and respond to different kinds of errors in Node.js —  
when to crash, when to recover, and how to handle each case cleanly.

---

## Structure
02-categories/
├─ 01-programmer-errors.js
├─ 02-operational-errors.js
├─ 03-domain-errors.js
├─ 04-cluster-errors.js
└─ 05-custom-errors.js

---

## Key Concepts

| Category | Description | Handling Strategy |
|-----------|--------------|-------------------|
| **Programmer Errors** | Logic or coding mistakes (e.g., null references, divide by zero) | Fix the code — never hide it |
| **Operational Errors** | External issues (e.g., file not found, DB down, bad input) | Handle gracefully — retry, log, or fallback |
| **Domain Errors** | (Legacy) Used to isolate async errors within a scope | Deprecated — use async/await instead |
| **Cluster Errors** | Worker-level errors in multi-process apps | Catch with `worker.on('error')` or `exit` |
| **Custom Errors** | App-specific error classes for structured handling | Use `instanceof` and return clean API responses |

---

## Takeaways
- Not all errors are equal — treat them differently.
- **Programmer errors → fix the bug.**  
  **Operational errors → handle and recover.**
- Custom errors make your codebase self-explanatory and production-ready.

---

## Real-World Relevance
- Builds reliability in distributed systems  
- Improves log quality and error traceability  
- Shows strong engineering judgment — a skill every senior team values

---

## How to Run
Each example can be executed directly:
```bash
node path/to/file.js
```