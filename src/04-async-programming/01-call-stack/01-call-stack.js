/**
 * Topic: Async Programming → Call Stack
 * Purpose: Demonstrates how JavaScript executes code using a Last-In-First-Out (LIFO) call stack.
 * Key Points:
 *  - Each function call pushes a new frame; returning pops it.
 *  - Errors generate stack traces that show the call history.
 *  - Deep recursion or heavy sync loops can overflow or freeze the stack.
 *  - The call stack must be clear before async callbacks can run.
 * Run: node src/04-async-programming/01-call-stack/01-call-stack.js
 * Expected:
 *  - Logs: a → b → c
 *  - Stack unwinds in reverse order after each return.
 */

function a() {
  console.log("a");
  b();
}

function b() {
  console.log("b");
  c();
}

function c() {
  console.log("c");
}

a();

// Notes:
// - The call stack is the foundation of the JavaScript runtime.
// - Long-running synchronous work blocks the event loop entirely.
// - In production debugging, reading stack traces helps locate failure points.