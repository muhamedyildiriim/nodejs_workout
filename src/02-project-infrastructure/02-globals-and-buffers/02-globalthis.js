/**
 * File: /02-project-infrastructure/02-globals-and-buffers/02-globalthis.js
 * Topic: Project Infrastructure → Globals → `globalThis`
 * Purpose: Demonstrates the "modern" `globalThis` keyword,
 * which solves the "portability" problem.
 *
 * Key Points:
 * - **The Problem:** The global object has different names in different
 * environments: `window` (Browser), `self` (Web Workers), `global` (Node.js).
 * - **The "Architect's" Solution:** `globalThis`.
 * - `globalThis` is the *standard, universal* name for the
 * global object, guaranteed to work in *all* JavaScript environments
 * (Node, Browser, etc.).
 *
 * Run: node src/02-project-infrastructure/02-globals-and-buffers/02-globalthis.js
 * Expected:
 * - Logs `true`, proving `globalThis` is the *same object* as `global`.
 */

console.log(
  "Is `globalThis` the same as `global` in Node.js?",
  globalThis === global
);

// You can (but shouldn't) pollute `globalThis` just like `global`
globalThis.myBadVariable = "This is also pollution";
console.log("Reading from `global` (via `globalThis` pollution):", global.myBadVariable);

// Notes:
// - When writing "isomorphic" or "universal" JavaScript (code that runs on *both* server (Node) and browser (React)), *always* uses `globalThis` instead of `global` or `window` to ensure "portability".