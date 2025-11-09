/**
 * File: /02-project-infrastructure/01-modules-cjs-vs-esm/02-esm-module.mjs
 * Topic: Project Infrastructure → Modules → ES Modules (ESM)
 * Purpose: Demonstrates the "Modern" JavaScript module system (ESM).
 * Key Points:
 * - `import`: The keyword to *import* a module. It is asynchronous (under the hood).
 * - `export`: The keyword to *export* values.
 * - This is the *new standard* for both browsers and Node.js.
 * - `.mjs` extension explicitly tells Node to treat this file as ESM.
 * - Alternatively, set `"type": "module"` in `package.json`.
 * Run: node src/02-project-infrastructure/01-modules-cjs-vs-esm/02-esm-module.mjs
 * Expected:
 * - Logs the content of the `logger.mjs` utility.
 * - Logs "Logger (ESM) ran 1 time(s)."
 * - Logs "Logger (ESM) ran 2 time(s)."
 */

// We import the logger utility using `import`
// Note: We *must* include the file extension `.mjs` in Node.js
import logger from "./lib/logger.mjs";

// We can also import built-in modules
import path from "node:path";

console.log("Running 02-esm-module.mjs");
console.log("Imported logger object:", logger);
console.log(
  "Imported built-in path module (type):",
  typeof path.join
);

// Use the imported logger
logger.log("Logger (ESM) ran 1 time(s).");
logger.log("Logger (ESM) ran 2 time(s).");

// Notes:
// - `import` is asynchronous and is the standard for all modern projects.
// - You *cannot* use legacy globals like `__dirname` or `__filename`
//   in a native ESM file. We will solve this in the `02-path-module`
//   "Book" (Konsept) using `import.meta.url`.