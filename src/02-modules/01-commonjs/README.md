# CommonJS Modules

**Goal:** Demonstrate classic Node.js module patterns using `require`, `module.exports`, and `exports`.

## Files
1. `01-index.cjs` — Orchestrator combining multiple CommonJS modules  
2. `02-import-specific.cjs` — Selective import using destructuring (`{ logError } = require(...)`)  
3. `03-logger-basic.cjs` — Exporting functions and constants via `exports`  
4. `04-logger-class.cjs` — Exporting a class with static logging methods
5. `05-logger-module-exports.cjs` — Exporting custom API objects using `module.exports`

## Key Takeaways
- **`require()`** loads modules synchronously and caches results after first load  
- **`exports`** is a shortcut reference to `module.exports`  
- **Reassigning `module.exports`** allows exporting any custom object or class  
- **Modules are singletons:** multiple imports share the same cached instance  
- **Use `.cjs`** extension when `"type": "module"` is set in `package.json`  
- **Factory functions** avoid shared state when multiple instances are required  

## Run
```bash
node src/02-modules/01-commonjs/01-index.cjs
```