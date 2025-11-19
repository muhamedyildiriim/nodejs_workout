# 04. Advanced Patterns & Scaling

**Goal:** Master the advanced engineering patterns required to build **robust**, **scalable**, and **maintainable** Node.js applications.

This section answers the question: **"How do I take a basic Node.js server and make it production-ready for millions of users?"**

This "Concept House" covers **Event-Driven Architecture**, **Stream Processing**, **Centralized Error Handling**, and **CPU Scaling**.

---

## Structure

1.  **`01-event-emitter/`**
    * **Concept:** The Observer Pattern.
    * **Demonstrates:** How to "decouple" services (e.g., `UserService` vs. `EmailService`) so they communicate via events rather than direct imports. This creates a loosely-coupled, testable architecture.

2.  **`02-streams/`**
    * **Concept:** Data Pipelines & Backpressure.
    * **Demonstrates:**
        * The `.pipe()` and `pipeline()` methods for connecting data sources to destinations.
        * **Backpressure:** The critical mechanism that prevents fast readers from overwhelming slow writers, ensuring memory stability.

3.  **`03-error-handling/`**
    * **Concept:** Robust Error Architecture.
    * **Demonstrates:**
        * The distinction between **Programmer Errors** (Crash/Restart) and **Operational Errors** (Recover/Respond).
        * **Custom Error Classes:** (`AppError`) for classifying errors.
        * **Global Error Handler:** A centralized middleware pattern to catch and format all errors in one place.

4.  **`04-workers-and-clusters/`**
    * **Concept:** CPU Scaling (Multi-Threading).
    * **Demonstrates:**
        * **The Problem:** How heavy CPU tasks block the Single Thread.
        * **Solution 1 (Worker Threads):** Offloading CPU work to a background thread.
        * **Solution 2 (Clustering):** Forking the server process to utilize all available CPU cores (the engine behind process managers like `pm2`).

---

## Key Takeaways (The "Architect's" Answers)

* **Decouple with Events:** Use `EventEmitter` to let parts of your app talk to each other without tight coupling.
* **Stream Large Data:** Never load large files into RAM. Use `Streams` to process data chunk-by-chunk with constant memory usage.
* **Centralize Errors:** Never rely on ad-hoc `try/catch` everywhere. Use a "Global Handler" and distinguish between "Crash" vs. "Recover" scenarios.
* **Scale the CPU:** Node.js is single-threaded, but your server isn't. Use `Cluster` or `Worker Threads` to break the single-thread limit for CPU-bound tasks.

## How to Run

```bash
# Event Emitter Decoupling:
node src/04-advanced-patterns-and-scaling/01-event-emitter/02-decoupling-pattern.js

# Stream Pipeline & Error Handling:
node src/04-advanced-patterns-and-scaling/02-streams/03-stream-pipeline.js

# CPU Blocking Demo (vs. Workers):
node src/04-advanced-patterns-and-scaling/04-workers-and-clusters/01-cpu-blocking-demo.js