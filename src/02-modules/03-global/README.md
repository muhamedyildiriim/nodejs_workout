# Global Objects in Node.js

**Goal:** Understand Node.js global scope, how it differs from browsers, and how `globalThis` provides a universal interface.

## Files
1. `01-global_example.js` — Demonstrates `global` keyword usage in Node.js  
2. `02-globalThis_demo.js` — Shows universal `globalThis` object (works in both Node.js and browsers)

## Key Takeaways
- The **global object** in Node.js is similar to `window` in browsers  
- Use **`global`** to define variables/functions accessible across modules  
- **`globalThis`** is the standardized global object across all environments  
- Avoid polluting the global scope in production — prefer module exports  
- Global variables/functions can lead to naming conflicts if overused  
- Always keep globals minimal and documented

## Run
```bash
node src/02-modules/03-global/01-global_example.js
node src/02-modules/03-global/02-globalThis_demo.js
```