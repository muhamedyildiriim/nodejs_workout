/**
 * File: 01-basics/02-event-loop.js
 * Topic: Event Loop Fundamentals
 * Purpose: Demonstrate how Node.js schedules tasks using the event loop and non-blocking callbacks.
 * Key Points:
 *  - JavaScript is single-threaded but asynchronous through the event loop.
 *  - The call stack runs main code first, then processes queued callbacks.
 *  - setTimeout() is deferred until the call stack is clear.
 *  - Enables Node.js to handle thousands of concurrent I/O operations efficiently.
 * Run: node src/01-basics/02-event-loop.js
 * Expected:
 *  - Output order: 1 → 3 → 2
 */

export function runEventLoopDemo() {
  console.log("1");
  setTimeout(() => console.log(2), 0);
  console.log(3);
  // Thanks to this mechanism, Node can handle thousands of requests simultaneously.
}

runEventLoopDemo();