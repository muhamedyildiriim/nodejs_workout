# API Concurrency Demo

## Overview
This demo shows how to **aggregate multiple async operations concurrently** in Node.js using `Promise.all`.  
It mimics a typical dashboard endpoint combining user data, permissions, and recent activity — all fetched in parallel.

---

## 🔧 Files
| File | Purpose |
|------|----------|
| `services.js` | Simulates 3 async service calls with artificial latency |
| `server.js` | Exposes `/dashboard` endpoint combining them with Promise.all |
| `README.md` | Documentation and usage instructions |

---

## 🚀 How to Run
```bash
node src/04-async-programming/12-realworld-projects/01-api-concurrency-demo/server.js
```