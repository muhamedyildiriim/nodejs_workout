# 03. API Architectures

**Goal:** Provide a "Masterclass" on the **end-to-end engineering** of a modern Node.js API.

This section answers the question: **"How do you build, secure, and connect a production-ready API?"**

This "Concept House" is built on the principle of **"Separation of Concerns"**. It is divided into the three core responsibilities of any API application.

---

## Structure

This section is organized by "Concept", demonstrating the "trade-offs" between different architectural patterns.

1.  **`01-web-server/`**
    * **Concept:** Building the Server.
    * **Demonstrates:** This section tells the story of *why* frameworks exist. It contrasts the "pain" of the **raw `http-module`** (manual routing, body parsing) with the "solution" of **`Express.js`** (middleware, routers, `res.json()`).

2.  **`02-authentication/`**
    * **Concept:** Securing the Server.
    * **Demonstrates:** This section covers the "Tools" (`bcrypt`, `jsonwebtoken`) and the two opposing "Architectures":
        * **"Stateful":** The "classic" (`passport-local` + `express-session`) cookie-based architecture, and its "scalability" challenges.
        * **"Stateless":** The "modern" (`passport-jwt`) token-based architecture, the standard for scalable APIs (e.g., Netflix, Uber).

3.  **`03-api-clients/`**
    * **Concept:** Consuming Other Services.
    * **Demonstrates:** This section is a **"Trade-Off Analysis"** (Fark Yaratan Analiz) of *how* our server (the "client") should talk to other APIs. It compares:
        * `native-fetch` (The Baseline)
        * `axios` (The Classic Standard)
        * `ky` (The Modern Lightweight)
        * `got` (The Robust/Retry Choice)
    * It concludes with the `05-client-abstraction-pattern.js`, the critical pattern for creating a maintainable and testable "Service Layer".

---

## Key Takeaways

* **Solve "Pain" with Frameworks:** The "raw" `http` module is powerful, but `Express.js` is the choice for "robustness" and "maintainability".
* **Stateful vs. Stateless:** The *most important* security "trade-off". Use **Stateful (`session`)** for simple, "monolithic" web apps. Use **Stateless (`JWT`)** for all modern, "scalable" APIs (Mobile, React, Microservices).
* **Abstract Your Clients:** *Never* use `axios.get()` directly in 100 different files. "Abstract" it into *one* `apiClient.js` file (the "Abstraction Pattern") to ensure your application is "testable" and "maintainable".

## How to Run

```bash
# Each section contains its own runnable demos:

# To run the raw "http-module" pain demo:
node src/03-api-architectures/01-web-server/01-http-module/02-basic-routing.js

# To run the "Express.js" solution demo:
node src/03-api-architectures/01-web-server/02-express-js/03-express-router.js

# To run the "Stateless" (JWT) auth server:
node src/03-api-architectures/02-authentication/04-passport-jwt.js

# To run the "Client Abstraction Pattern" demo:
node src/03-api-architectures/03-api-clients/05-client-abstraction-pattern.js