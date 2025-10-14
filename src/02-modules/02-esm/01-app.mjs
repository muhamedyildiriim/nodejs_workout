/**
 * File: 02-esm/01-app.mjs
 * Topic: ECMAScript Modules → Full Comparison with CommonJS
 * Purpose: Demonstrate differences in syntax, import/export styles, and behavior between CommonJS and ESM.
 * Key Points:
 *  - ESM uses `import`/`export` instead of `require`/`module.exports`
 *  - In package.json → `"type": "module"` or use `.mjs` extension
 *  - Top-level `await` and `import.meta.url` are ESM-only features
 * Run: node src/02-modules/02-esm/01-app.mjs
 * Expected:
 *  - Logs messages via named imports, default class imports, and .mjs module
 */

//
// Import style comparison
// -----------------------
// CommonJS: const chalk = require("chalk");
// ESM:      import chalk from "chalk";
//
// Export style comparison
// -----------------------
// CommonJS: exports.something = ...
// ESM:      export function ... / export const ...
//

import { logInfo, logError, myDefaultMessage } from "./03-logger-basic.mjs";
import LoggerESM from "./04-logger-default-class.mjs";
import { Logger } from "./05-logger-export-class.mjs";
import "./02-import-specific.mjs";

console.log("=== ESM DEMO ===");

// Named import usage
logInfo(`${myDefaultMessage} printed in blue`);
logError("some error message printed in red");

// Default class import usage
LoggerESM.info("bilgi mesajı");
LoggerESM.error("hata mesajı");
console.log(LoggerESM.defaultMessage);

// Named class import from .mjs
Logger.info(`${Logger.defaultMessage} printed in blue`);
Logger.error("some error message printed in red");
