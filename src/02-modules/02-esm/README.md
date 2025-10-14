# ECMAScript Modules (ESM)

**Goal:** Demonstrate modern module syntax using `import` / `export` and highlight key differences from CommonJS.

## Files
1. `01-app.mjs` — Full demo combining named, default, and imported modules  
2. `02-import-specific.mjs` — Selective import example with aliasing (`as esmLogError`)  
3. `03-logger-basic.mjs` — Basic named exports (`logInfo`, `logError`, `myDefaultMessage`)  
4. `04-logger-default-class.mjs` — Default export pattern with a class (`LoggerESM`)  
5. `05-logger-export-class.mjs` — Named class export (`Logger`) — supports multiple APIs  
6. `06-logger-named.mjs` — Aliased named exports — ESM equivalent of CommonJS `module.exports`

## Key Takeaways
- Prefer **named exports** for clarity and refactor safety  
- Use **default export** only for single-purpose modules  
- **Aliasing (`as`)** improves API consistency across files  
- `.mjs` helps explicitly mark ESM modules  
- **Top-level `await`** and `import.meta.url` are exclusive to ESM  
- Use `createRequire()` for CommonJS interop when `"type": "module"` is set

## Run
```bash
node src/02-modules/02-esm/01-app.js
```