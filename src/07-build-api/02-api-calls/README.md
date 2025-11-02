# HTTP API Clients & Architectural Patterns

**Goal:** Master and compare the most common HTTP clients in Node.js. Understand their "trade-offs" (fark yaratan noktalar) and learn the critical architectural pattern for using them in production.

---

## Structure
02-api-calls/
├─ 01-http-module/
├─ 02-axios/
├─ 03-ky/
├─ 04-api-client-server/
├─ 05-fetch/
└─ 06-got-package/

---

## Key Concepts

This directory compares the "Tools" (Clients) and the "Architecture" (The Pattern).

| Topic | Description | Key Feature / Trade-Off |
|:---|:---|:---|
| **`01-http-module`** | The "bare metal" Node.js module for creating servers. | **Pro:** Built-in (no dependencies), full control. **Con:** Extremely raw, requires massive "boilerplate". |
| **`02-axios`** | The "classic" industry standard. CJS/ESM compatible. | **Pro:** Battle-tested, `interceptors`. **Con:** Heavier, not `fetch`-native. |
| **`03-ky`** | A modern, lightweight `fetch` wrapper. ESM-only. | **Pro:** Simple API, auto-throws errors. **Con:** Adds a dependency. |
| **`05-fetch`** | The native, built-in Node.js (v18+) client. | **Pro:** No dependencies. **Con:** "Raw" (requires manual `res.ok` checks & `JSON.stringify`). |
| **`06-got-package`** | The powerful, "heavy-duty" client. ESM-only. | **Pro:** Built-in automatic retries, advanced streams. **Con:** Overkill for simple tasks. |
| **`04-api-client-server`** | **(The Pattern)** An Abstraction Layer, or "The Kitchen". | **Pro:** Hides implementation details. **Con:** Requires initial setup. |

---

## Takeaways
- There is no single "best" client. The 'best' choice always depends on the project's needs (e.g., reliability vs. simplicity, dependencies vs. built-in).
- `axios`, `ky`, and `got` are **convenience wrappers**. They exist to solve the "boilerplate" (like `!res.ok` checks) of using `native-fetch`.
- The **Abstraction Pattern** (in `04-api-client-server`) is more important than *which tool* you pick. It gives you the freedom to change your tool later without rewriting your entire application.

---

## Real-World Relevance
- This directory teaches **Trade-Off Analysis**. Being able to justify *why* you chose `got` over `fetch` for a specific task is a core senior engineering skill.
- The `04-api-client-server` pattern is **essential** for building code that is maintainable, testable, and scalable.
- This knowledge is a massive differentiator in technical interviews, as it proves you think about architecture, not just "how to write a GET request".

---

## How to Run
Each client has its own examples. Packages like `axios`, `ky`, and `got` must be installed:
```bash
npm install axios ky got
```