# Propagation & Recovery

**Goal:** Learn how errors travel (“bubble up”) through code and how to recover gracefully.

This section focuses on *error flow design* — chaining, wrapping, and retrying to make your code resilient and debuggable.

---

## Structure
04-propagation-recovery/
├─ 01-error-cause.js
├─ 02-error-propagation.js
└─ 03-error-recovery.js

---

## Key Concepts

| Concept | Description | Real-World Use |
|----------|--------------|----------------|
| **Error Cause** | Preserve root cause when wrapping errors | Easier debugging in layered systems |
| **Error Propagation** | Bubble errors up through multiple functions | Centralized handling (API, worker, etc.) |
| **Error Recovery** | Retry failed operations safely | Resilient APIs & background jobs |

---

## Takeaways
- `cause` helps trace *why* an error happened, not just *where*.  
- Propagation separates error detection from error handling.  
- Retry mechanisms keep systems stable under temporary failure.

---

## Real-World Relevance
- Essential for production-grade reliability  
- Used in retry loops, job queues, and distributed systems  
- Demonstrates a “senior engineer mindset” — defensive and traceable design

---

## How to Run
Each file can be executed directly:
```bash
node path/to/file.js
```