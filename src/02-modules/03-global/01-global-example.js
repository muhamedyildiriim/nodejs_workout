/**
 * File: 03-global/01-global_example.js
 * Topic: Node.js Global Object → `global`
 * Purpose: Demonstrate how the `global` keyword provides top-level scope in Node.js applications.
 * Key Points:
 *  - `global` in Node.js is similar to `window` in browsers.
 *  - Any property attached to `global` is accessible in any module.
 *  - Use carefully — global pollution can cause naming conflicts.
 * Run: node src/02-modules/03-global/01-global-example.js
 * Expected:
 *  - Logs "Mami" and "Hello!" from globally defined variables/functions.
 */

// [GLOBAL] KEYWORD
// In Node.js, the global object is the top-level object — similar to window in browsers.
// It represents the global scope of your application, meaning any property attached to global
// can be accessed from anywhere in your code (any module).

// Browser -> window -> window.alert('Hi!')
// Node.js -> global -> global.console.log('Hi!')
// Universal -> globalThis -> globalThis.console.log('Hi!')

// Global variable
global.username = "Mami";
console.log(username); // "Mami"

// Global function
global.sayHello = () => console.log("Hello!");
sayHello(); // "Hello!"