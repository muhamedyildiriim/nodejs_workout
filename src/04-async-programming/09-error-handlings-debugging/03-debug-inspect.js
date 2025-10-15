/**
 * Topic: Async Programming → Error Handling & Debugging → Node Inspector
 * Purpose: Demonstrates how to use the Node.js inspector (V8 DevTools protocol) for step debugging.
 * Key Points:
 *  - Enables breakpoints, step execution, and variable inspection
 *  - Supports async call stacks to trace Promises across ticks
 *  - Start with `node --inspect` or `--inspect-brk` and attach DevTools or VS Code
 * Run: node --inspect-brk src/04-async-programming/09-error-handlings-debugging/03-debug-inspect.js
 * Expected:
 *  - Open chrome://inspect or VS Code debugger
 *  - Pause at breakpoint, inspect variables a/b, and view async stack trace
 */

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

async function buggyFlow() {
  const a = await wait(50).then(() => 1);
  const b = await wait(50).then(() => 2);

  // 💡 Set a breakpoint here in DevTools or VS Code to inspect values
  throw new Error(`boom at ${a + b}`);
}

buggyFlow().catch((e) => {
  // Pause on caught exceptions to inspect the async stack trace
  console.error("caught:", e.message);
});

/*
Notes:
- The Node inspector uses the Chrome DevTools protocol (V8 Inspector).
- Async call stacks preserve context across Promise chains for clarity.
- Use breakpoints and watch expressions to trace async variable states.
- Avoid debugging directly in production; prefer staging or local mirrors.
- Ideal for diagnosing race conditions, unhandled rejections, and async ordering bugs.
*/