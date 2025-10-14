# Modules

**Goal:** Compare CommonJS and ECMAScript Modules in Node.js and show how globals differ between both.

## Structure
- `01-commonjs/` — `require`, `module.exports`, resolution, cyclic deps
- `02-esm/` — `import/export`, top-level `await`, `import.meta.url`, interop
- `03-global/` — `globalThis`, `__dirname` vs `import.meta.url`, process & env

## Key Takeaways
- Prefer ESM for modern code; interop with CommonJS when needed
- Be explicit about default vs named exports
- Handle path utilities differently in ESM (`fileURLToPath(import.meta.url)`)
- Avoid accidental cycles; split responsibilities or use interfaces

## How to Run
Run each file directly with Node ≥ 20:
```bash
node 02-modules/02-esm/app.js
```