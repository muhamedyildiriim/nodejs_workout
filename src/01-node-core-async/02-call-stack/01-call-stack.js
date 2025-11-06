/**
 * File: /01-node-core-async/02-call-stack/01-call-stack.js
 * Topic: Node.js Core → The Call Stack
 * Purpose: Demonstrates how JavaScript executes code using a Last-In-First-Out (LIFO) call stack.
 * Key Points:
 * - Each function call pushes a new "frame" onto the stack.
 * - Returning from a function "pops" its frame off the stack.
 * - This is the "Cook's Counter" - it's what the Main Thread
 * is *currently* doing (synchronous work).
 * - The call stack must be clear before async callbacks can run.
 * Run: node src/01-node-core-and-async/02-call-stack/01-call-stack.js
 * Expected:
 * - Logs: a → b → c
 */

// 

function a() {
  console.log("a: Pushed onto stack");
  b();
  console.log("a: Popped off stack");
}

function b() {
  console.log("b: Pushed onto stack");
  c();
  console.log("b: Popped off stack");
}

function c() {
  console.log("c: Pushed onto stack");
  console.log("c: Popped off stack");
}

// 1. a() is pushed onto the stack
a();

// Notes:
// - The call stack is the foundation of the JavaScript runtime.
// - Reading stack traces from Errors helps locate failure points.
// - Long-running *synchronous* work (like a giant `for` loop)
//   "Blocks" the stack, which in turn blocks the Event Loop.