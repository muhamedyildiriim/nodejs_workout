# Authentication: Architectures & Strategies

**Goal:** Understand the complete authentication workflow, from the fundamental "Tools" (like `bcrypt` and `JWT`) to the two opposing "Machines" (Core Architectures): **Stateful (Sessions)** vs. **Stateless (Tokens)**.

---

## Structure
03-auth/
├─ 01-jsonwebtoken/
├─ 02-bcrypt/
├─ 03-passport-local/
└─ 04-passport-jwt/

---

## Key Concepts

This directory is divided into two parts: the "Tools" (the non-negotiable building blocks) and the "Architectures" (the two primary ways to build a login system).

| Directory | Type | Description |
|:---|:---|:---|
| **`01-jsonwebtoken`** | **Tool (The Key)** | The Tool for creating and verifying **Stateless** JSON Web Tokens (JWTs). |
| **`02-bcrypt`** | **Tool (The Safe)** | The **NON-NEGOTIABLE** Tool for securely hashing and comparing passwords. |
| **`03-passport-local`** | **Architecture (Stateful)** | The "Stateful Makine" (Machine) that uses `express-session` (Cookies) to *remember* a user. |
| **`04-passport-jwt`** | **Architecture (Stateless)** | The "Stateless Makine" (Machine) that uses `Authorization` headers (Tokens) to *verify* a user without remembering them. |

---

## Takeaways
- **The Foundation:** You **must** use `bcrypt` to protect passwords. This is not optional.
- **The Core Trade-Off:** The single most important architectural decision you will make is choosing between **Stateful (Sessions)** or **Stateless (Tokens)**.
- **`passport.js`** is the "Güvenlik Şefi" (Security Chief) that provides the **Strategy Pattern**, allowing you to implement *either* architecture (or both!) under one clean framework.
- **Stateful (`passport-local` + `session`)** is classic, simpler for the client (browser handles cookies), but scales poorly across multiple servers (the "Netflix Problem") unless you add a shared session store like `Redis`.
- **Stateless (`passport-jwt`)** is the modern standard for APIs (Mobile, React, Microservices). It is infinitely scalable but requires the *client* to securely store and resend the token on every request.

---

## Real-World Relevance
- **The Interview Question:** "How do you design an authentication system for a new project?"
- **The "Architect" (Senior) Answer:** "My design depends entirely on the **client**.
    1.  **For a traditional web app** (like an admin dashboard), I'd use a **Stateful** architecture with `passport-local` and `express-session`. To solve the 'Netflix Problem' and make it scalable, I would back the session store with a **Redis** instance instead of server RAM.
    2.  **For a Mobile App or a React/Vue frontend (SPA)**, I **must** use a **Stateless** architecture. The `/login` route would use `bcrypt.compare` and then issue a short-lived `JWT` (Access Token). The client would then send this token in the `Authorization: Bearer ...` header. All protected routes would be guarded by `passport-jwt` with `{ session: false }`.
    
    In both cases, password hashing is handled by `bcrypt`."

---

## How to Run
The "Tools" (`01-jwt`, `02-bcrypt`) are standalone scripts. The "Architectures" (`03-local`, `04-jwt`) are complete servers that must be run and tested with an API client like Postman.

```bash
# To run the Stateful (Session) Server:
node src/07-build-api/03-auth/03-passport-local/01-local-strategy-server.js

# To run the Stateless (Token) Server:
node src/07-build-api/03-auth/04-passport-jwt/01-jwt-strategy-server.js
```