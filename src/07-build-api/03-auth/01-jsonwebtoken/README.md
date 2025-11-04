# Authentication: jsonwebtoken (JWT)

**Goal:** Learn how to create and verify JSON Web Tokens (JWTs). This is the "key" in a "stateless" authentication system.

---

## Structure
01-jsonwebtoken/
├─ 01-jwt-sign.js
├─ 02-jwt-verify.js
└─ 03-jwt-errors.js

---

## Key Concepts

This package provides the "Tools" for creating and checking identity tokens.

| Concept | Description |
|:---|:---|
| **`jwt.sign()`** | The function to **create** (sign) a new token. It takes a `payload`, a `secret`, and `options` (like `expiresIn`). |
| **`jwt.verify()`** | The function to **check** a token. It takes the `token` and the *exact same* `secret`. |
| **Payload** | The data *inside* the token (e.g., `userId`, `role`). This data is **NOT encrypted**, only Base64 encoded. Never put secrets here. |
| **Secret Key (`.env`)** | The **most critical** piece. This "password" is used to create the signature. It *must* be kept in `.env` and **NEVER** shared. |
| **Signature** | The part of the token that proves it wasn't tampered with. `verify()` checks this signature. |
| **`TokenExpiredError`** | The specific error thrown when `expiresIn` time has passed. |

---

## Takeaways
- JWT is a **"Stateless"** mechanism. The server doesn't need to store the token in a database to know it's valid. It just checks the signature.
- This is just the "Tool" (the kilit). The "Architecture" (the kapı) is how you *use* this tool in an **Express.js Middleware** to protect routes.
- The **payload is readable by anyone**. Its security comes from the **signature**, which proves the payload is authentic.

---

## Real-World Relevance
- **The Interview Question:** "How do you secure an API?"
- **The "Tool" Answer:** "I use `jwt.verify()` to check a token."
- **The "Architect" (Senior) Answer:** "I implement a 'stateless' auth system using JWTs. I use `jwt.sign()` on login, but I *don't* send the token to `localStorage` due to XSS risks. Instead, I send it as an **`HttpOnly` cookie**. My Express middleware then uses `jwt.verify()` (with the secret from `process.env`) to validate this cookie on every protected request. This provides a robust defense against common web vulnerabilities."

---

## How to Run
First, install the required packages:
```bash
npm install jsonwebtoken dotenv
```
Second, add your secret to your .env file (in the project root):
`JWT_SECRET="your-super-secret-key-that-no-one-knows"`

Finally, run the example files:
```bash
node src/07-build-api/03-auth/01-jsonwebtoken/01-jwt-sign.js
node src/07-build-api/03-auth/01-jsonwebtoken/02-jwt-verify.js
node src/07-build-api/03-auth/01-jsonwebtoken/03-jwt-errors.js
```