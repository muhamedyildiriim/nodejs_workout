# Authentication: Password Hashing with `bcryptjs`

**Goal:** Learn the **critical and non-negotiable** process of securely hashing and comparing passwords. This is the foundation of secure user authentication.

---

## Structure
02-bcrypt/
├─ 01-hash-password.js
└─ 02-compare-password.js

---

## Key Concepts

This package provides the tools to *one-way hash* passwords. Hashing is **not** encryption; it cannot be reversed.

| Concept | Description |
|:---|:---|
| **`bcrypt.genSalt()`** | Generates random data (a "salt"). This ensures two identical passwords (e.g., "123") create two different hashes. |
| **`bcrypt.hash()`** | The function used during **Registration (`/register`)**. It combines the plain-text password with the salt and runs it through a complex algorithm. |
| **`bcrypt.compare()`** | The function used during **Login (`/login`)**. It safely compares a plain-text attempt against a stored hash *without* ever de-hashing. |
| **Salt Rounds (e.g., 10)** | Controls how "slow" and "expensive" the hash function is. Higher is more secure. This is a deliberate defense against brute-force attacks. |
| **Asynchronous** | All these functions are `async` (asenkron) *by design*. They are slow on purpose and must *never* block the event loop. |

---

## Takeaways
- **NEVER, EVER** store passwords in plain text. This is a critical security vulnerability.
- `bcrypt.hash()` is used **once** (at registration) to create the hash.
- `bcrypt.compare()` is used **every time** (at login) to check the password.
- You *only* store the final hash string (e.g., `$2a$10$...`) in your database. `bcrypt` automatically stores the salt *inside* this hash string.

---

## Real-World Relevance (The "Fark Yaratan Analiz")
- **The Interview Question:** "How do you handle user passwords?"
- **The "Tool" Answer:** "I use `bcrypt`."
- **The "Architect" (Senior) Answer:** "I handle passwords in two distinct flows. On **registration**, I `await bcrypt.hash(password, 10)` to create a securely salted and hashed string, which is the *only* thing I store in the database. On **login**, I fetch the user's stored hash and use `await bcrypt.compare(loginAttempt, storedHash)`. This function is secure against timing attacks and confirms the password without ever revealing the original. All operations are asynchronous to protect the event loop."

---

## How to Run
1. First, install the package:
```bash
npm install bcryptjs
```

2. Run this to generate a new secure hash:
```bash
node src/07-build-api/03-auth/02-bcrypt/01-hash-password.js
```

3. Copy the "Hashed Password" output from step 1.

4. Paste that hash into the `STORED_HASH_FROM_DB` variable in the second file.

5. Run this to check the login logic:
```bash
node src/07-build-api/03-auth/02-bcrypt/02-compare-password.js
```