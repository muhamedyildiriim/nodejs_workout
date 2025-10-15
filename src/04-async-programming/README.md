# Async Programming

**Goal:** Master how asynchronous work is scheduled and executed in Node.js — from the call stack to microtasks, timers, I/O, and EventEmitter flows.

## Structure
- `01-call-stack/` – stack basics, sync vs async entry points
- `02-callbacks/` – error-first callbacks, pitfalls
- `03-promises/` – chaining, error flow, microtasks
- `04-timers-nexttick/` – `nextTick`, `setImmediate`, timers ordering
- `05-event-loop/` – phases overview with observable logs
- `06-io-and-libuv/` – file/network I/O scheduling
- `07-event-emitter/` – listener order, memory leaks
- `08-microtasks/` – `queueMicrotask`, promise microtask queue
- `09-error-handling/` – async error patterns
- `10-performance/` – basic latency & `perf_hooks`
- `11-streams/` – backpressure, piping
- `12-realworld/` – small, production-minded examples

## Key Takeaways
- Promises schedule **microtasks**; timers/I-O run in **event-loop phases**.
- `process.nextTick` runs **before** other microtasks; `setImmediate` vs `setTimeout(0)` differ by phase.
- Always handle async errors (`.catch` or `try/catch` with `await`) to avoid unhandled rejections.

## How to Run
Each example is standalone:
```bash
node path/to/file.js
```