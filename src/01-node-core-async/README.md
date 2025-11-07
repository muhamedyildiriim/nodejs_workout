# 01. Node.js Core & Async Architecture

**Goal:** Understand the **"Architect's View"** of the Node.js runtime. This is the "Masterclass" on the "Single-Threaded Event Loop" and the "Non-Blocking I/O" model that makes Node.js fast and scalable.

This section answers the #1 "America's level" interview question: **"How does Node.js work under the hood?"**

This directory merges **Theory (Phase 1)** code and **Mastery (Phase 3)** code into unified "Concept Books" (Konsept Kitapları).

---

## Structure (The "Books" in this Section)

1.  **`01-orchestrator/`**
    * Runs the "Mastery" demos (`...MASTERY.js` files) in a clean, sequential flow to *prove* the concepts.

2.  **`02-call-stack/`**
    * **Concept:** The "Cook's Counter" (Tezgah) - How JavaScript runs code.
    * **Contains:** `01-call-stack.js` (Theory).

3.  **`03-callbacks/`**
    * **Concept:** The "Classic" (Phase 1) way of handling async results.
    * **Contains:** `01-callbacks-basics.js` (Theory).

4.  **`04-event-loop-concepts/`**
    * **Concept:** The "Cook's Priority List" (Aşçının Öncelik Listesi).
    * **Contains (Theory):** `02-io-callback-priority.js`, `03-nexttick-starvation.js`
    * **Contains (Mastery):** `01-queue-priority-demo.js` (Proves the `Sync > Micro > Macro` rule).

5.  **`05-io-and-libuv-concepts/`**
    * **Concept:** The "Cook vs. The Waiter" (Main Thread vs. Libuv).
    * **Contains (Theory):** `01-fs-io-THEORY.js`, `02-http-io-THEORY.js`.
    * **Contains (Mastery):** `03-blocking-vs-nonblocking-MASTERY.js` (Proves the "Sin" vs. the "Architect's Choice").

6.  **`06-promises-async-await/`**
    * **Concept:** The "Modern" (Phase 3) way of handling async results and performance.
    * **Contains (Theory):** `01-promise-chaining.js`, `02-async-await-syntax.js`.
    * **Contains (Mastery):** `03-parallel-vs-sequential.js` (Proves the "Parallel Performance Win").

---

## Key Takeaways (The "Architect's" Answers)

* Node.js is not "fast" because it's multi-threaded (it's not). It's "fast" because its **Main Thread (the "Cook") never blocks**.
* All heavy I/O (files, network) is given to a "Waiter" (**Libuv's C++ Thread Pool** or the **OS Kernel**).
* **`Microtasks` (e.g., `Promise.then`) will *always* execute before `Macrotasks` (e.g., `setTimeout`, `fs.readFile` callback).**
* **`fs.readFileSync` is the "Sin"**: Never use it in a running server.
* **`Promise.all` is the "Performance Win"**: Never `await` non-dependent I/O tasks in a sequence.

## How to Run

```bash
# To run the entire "Mastery Demo" (Phase 3) in sequential order:
node src/01-node-core-and-async/01-orchestrator/index.js

# To run a specific "Theory" (Phase 1) file directly:
node src/01-node-core-and-async/02-call-stack/01-call-stack.js

# To run a specific "Mastery" (Phase 3) file directly:
node src/01-node-core-and-async/06-promises-async-await/03-parallel-vs-sequential.js