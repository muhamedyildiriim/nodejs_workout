# Architectural Pattern: API Client Abstraction

**Goal:** Understand the **most important** architectural pattern for handling external APIs: The Abstraction Layer (or "Service Layer").

---

## Structure
04-api-client-server/
└─ api-service.js

---

## Key Concepts

This directory contains a **pattern**, not just a tool. It separates the "what" from the "how".

| Concept | Description |
|:---|:---|
| **Separation of Concerns** | Our app (the "what") just calls `postService.getPostById(1)`. |
| **Implementation Detail** | The service (`api-service.js`, the "how") worries about using `ky`, headers, and base URLs. |
| **Configuration** | API keys and URLs are not hardcoded. They are loaded from `.env` files. |
| **Maintainability** | If we want to switch from `ky` to `axios`, we **only change this one file**. |
| **Testability** | We can easily "mock" the `postService` object in our tests without making real API calls. |

---

## Takeaways
- **This is not optional for professional, senior-level code.** You must hide implementation details.
- This pattern (the "Kitchen") allows you to swap your tools (`ky`, `axios`, `fetch`) without the rest of your app (the "Restaurant") even knowing.
- Managing configuration (`.env`) is a core part of this pattern.

---

## Real-World Relevance
- This architecture is the foundation of all clean, testable, and scalable Node.js applications.
- This pattern demonstrates strong engineering judgment and is a *massive* differentiator in technical interviews.

---

## How to Run
First, install the required packages:
```bash
npm install ky dotenv
node src/07-build-api/02-api-calls/04-api-client-server/api-service.js
```