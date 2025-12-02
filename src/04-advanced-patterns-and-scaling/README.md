# 04. Advanced Patterns & Scaling

**Goal:** Master the advanced engineering patterns required to build **robust**, **scalable**, and **maintainable** Node.js applications.

This section answers the question: **"How do I take a basic server and make it production-ready for high-load environments?"**

It covers Event-Driven Architecture, Stream Processing, Centralized Error Handling, CPU Scaling, Caching, and Quality Assurance.

---

## Structure

1.  **`01-event-emitter/`**
    * **Concept:** The Observer Pattern.
    * **Focus:** Decoupling services (e.g., User vs. Email) using event-driven communication.

2.  **`02-streams/`**
    * **Concept:** Data Pipelines & Backpressure.
    * **Focus:** Handling large datasets efficiently without crashing memory (`.pipe`, `pipeline`).

3.  **`03-error-handling/`**
    * **Concept:** Robust Error Architecture.
    * **Focus:** Distinguishing "Programmer Errors" (Crash) vs "Operational Errors" (Recover), Custom Error Classes, and Global Error Handlers.

4.  **`04-workers-and-clusters/`**
    * **Concept:** CPU Scaling.
    * **Focus:** Overcoming the single-threaded limit using **Worker Threads** (for CPU tasks) and **Clustering** (for traffic distribution).

5.  **`05-caching-with-redis/`**
    * **Concept:** Distributed Caching & Performance.
    * **Focus:** Using **Redis** to implement the "Cache-Aside" pattern (reducing DB load) and solving the session scalability problem.

6.  **`06-testing/`**
    * **Concept:** Quality Assurance.
    * **Focus:**
        * **Unit Testing:** Verifying isolated logic with `Jest`.
        * **Integration Testing:** Verifying API endpoints with `Supertest`.

---

## Key Takeaways

* **Decouple with Events:** Avoid tight coupling between services; let them communicate via events.
* **Stream Large Data:** Never load large files into RAM. Use Streams to handle data chunk-by-chunk.
* **Centralize Errors:** Use a global handler to ensure consistent error responses and logging.
* **Scale Horizontally:** Use Redis for shared state/caching and Clustering/Workers to utilize multi-core CPUs.
* **Test Everything:** Automated testing (Unit + Integration) is the only way to ensure reliability during rapid development.

## How to Run

Each sub-directory contains standalone demos. Refer to the READMEs inside each folder for specific run instructions.

*Prerequisite:* Some demos require a running **Redis** instance (e.g., via Docker).