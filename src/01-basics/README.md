# Node.js Basics

**Goal:** Introduce core Node.js async fundamentals — event loop, non-blocking I/O, and Promises.

## Files
1. `01-index.js` — Entry file demonstrating basic asynchronous logging  
2. `02-event-loop.js` — Illustrates Node.js event loop phases and callback order  
3. `03-nonblocking.js` — Shows how I/O operations avoid blocking the main thread  
4. `04-promises.js` — Demonstrates Promises and async/await for clean async flow

## Key Takeaways
- Node.js uses a **single-threaded event loop** for concurrency  
- **Non-blocking I/O** keeps the event loop free for new work  
- **Timers, I/O, and microtasks** are processed in well-defined phases  
- **Promises** simplify async code readability with `async/await`  
- Avoid blocking operations like heavy CPU loops or sync I/O  
- Understanding the event loop is essential for debugging performance issues  

## Run
```bash
node src/basics/01-index.js
node src/basics/02-event-loop.js
node src/basics/03-nonblocking.js
node src/basics/04-promises.js
```