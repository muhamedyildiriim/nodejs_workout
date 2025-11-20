# 03. API Architectures

**Goal:** Provide a "Masterclass" on the **end-to-end engineering** of a modern Node.js API.

This section answers the "Architect's" question: **"How do you build, secure, connect, and structure a production-ready API?"**

It is built on the principle of **"Separation of Concerns"**, ensuring that Server Logic, Security, Data Access, and Views remain decoupled.

---

## Structure

1.  **`01-web-server/`**
    * **Concept:** Building the Server.
    * **Focus:** Contrasts the raw `http-module` (manual routing/parsing pain) with **`Express.js`** (middleware, routers, clean API).

2.  **`02-authentication/`**
    * **Concept:** Security Architecture.
    * **Focus:**
        * **Stateful:** Cookie-based sessions (`passport-local` + `express-session`).
        * **Stateless:** Token-based auth (`passport-jwt`), the standard for scalable microservices.
        * **Tools:** `bcrypt` for hashing, `jsonwebtoken` for signing.

3.  **`03-api-clients/`**
    * **Concept:** Consuming External Services.
    * **Focus:** A trade-off analysis of HTTP clients (`fetch`, `axios`, `ky`, `got`) and the critical **"Client Abstraction Pattern"** to decouple external dependencies from business logic.

4.  **`04-database-access/`**
    * **Concept:** Data Layer Foundation.
    * **Focus:** Establishing architectural prerequisites *before* DB integration:
        * **Validation:** Using `zod` for strict schema validation at the entry point.
        * **Repository Pattern:** Decoupling business logic from specific database drivers (SQL vs NoSQL) via dependency injection.

5.  **`05-template-engines/`**
    * **Concept:** Server-Side Rendering (SSR).
    * **Focus:** Generating dynamic HTML on the server using **EJS**. Essential for transactional emails, admin dashboards, and SEO-critical pages.

---

## Key Takeaways

* **Use Frameworks for Robustness:** `Express.js` solves the brittleness of raw Node.js HTTP handling.
* **Security Trade-offs:** Choose **Stateless (JWT)** for scalability across multiple servers/mobile apps, and **Stateful (Session)** for simple monolithic web apps.
* **Abstract External Calls:** Never use HTTP clients directly in controllers. Wrap them in a Service/Client layer.
* **Validate Early:** "Garbage In, Garbage Out." Always validate input with `zod` before it reaches your domain logic.
* **Decouple Data Access:** Use the Repository Pattern to keep your code testable and database-agnostic.

## How to Run

Each sub-directory contains standalone demos. Refer to the READMEs inside each folder for specific run instructions.