/**
 * File: 03-global/02-globalThis-demo.js
 * Topic: Node.js Global Object → `globalThis`
 * Purpose: Demonstrate the universal `globalThis` object that works in both Node.js and browsers.
 * Key Points:
 *  - `globalThis` is a standard, environment-agnostic global object.
 *  - Works identically across browsers, Node.js, and web workers.
 *  - Preferred for writing portable, environment-independent code.
 * Run: node src/02-modules/03-global/02-globalThis-demo.js
 * Expected:
 *  - Logs "Running Node Modules Demo".
 */

// Demonstrating the universal globalThis object
// Works in both browser and Node.js

globalThis.appName = "Node Modules Demo";
globalThis.sayAppName = () => console.log(`Running ${appName}`);

sayAppName(); // "Running Node Modules Demo"