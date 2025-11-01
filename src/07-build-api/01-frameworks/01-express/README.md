# Express API — From Basics to Advanced (ESM Edition)

**Goal:**  
Master how to design and build modern, production-ready APIs with **Express.js** using **ECMAScript Modules (ESM)** syntax.  
Learn how to handle routing, errors, validation, security, logging, and graceful shutdown — just like professional backend engineers do.

---

## Structure
01-express/
├─ express-basics/
│ ├─ app.js
│ ├─ routes.js
│ └─ errors.js
└─ express-advanced/
├─ server.js
├─ app.js
├─ middleware.js
├─ config.js
└─ users.module.js

## Key Concepts

| Topic | Description | Why It Matters |
|--------|--------------|----------------|
| **Express Basics** | Secure defaults, modular routing, and centralized error handling | Builds a solid API foundation |
| **Express Advanced** | Validation, structured logging, rate limiting, graceful shutdown | Brings production-grade reliability |
| **ESM Syntax** | Uses `import/export` instead of `require()` | Aligns with modern Node.js standards |
| **Security (Helmet + CORS)** | Protects against common web vulnerabilities | Ensures safe cross-origin access |
| **Error Handling** | Centralized JSON error responses | Consistent and predictable behavior |
| **Request IDs + Logging (Pino)** | Adds traceability for each request | Essential for debugging and observability |
| **Validation (Zod)** | Enforces input structure and types | Prevents bad data early |
| **Rate Limiting** | Limits requests per IP | Keeps APIs stable under load |
| **Config via ENV** | Reads settings from environment variables | Supports CI/CD and multiple environments |
| **Graceful Shutdown** | Handles SIGINT/SIGTERM safely | Enables zero-downtime deployments |

---

## Takeaways
- Centralize logic for errors, validation, and configuration.  
- Secure your API from the first middleware (Helmet, CORS).  
- Structure code for long-term scalability.  
- Track every request with IDs and structured logs.  
- Exit gracefully — production apps must shut down cleanly.  

---

## Real-World Relevance
- Express powers APIs at companies like Netflix, Uber, and Slack.  
- Recruiters look for developers who know **operational excellence**, not just syntax.  
- This project proves you understand **reliability, maintainability, and security** — the hallmarks of a professional backend engineer.

---

## How to Run

### 1️⃣ Setup
```bash
# inside nodejs_workout/
npm init -y
npm i express cors helmet morgan express-rate-limit zod nanoid pino pino-pretty
node src/07-build-api/01-frameworks/01-express/01-express-basic/app.js
node src/07-build-api/01-frameworks/01-express/02-express-advanced/server.js