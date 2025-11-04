# Authentication: Passport.js (Stateful with Sessions)

**Goal:** Learn the **"Stateful" (Durum Tutan)** authentication model using `passport-local` and `express-session`. This is the classic, monolithic web application approach.

---

## Structure
03-passport-local/
└─ 01-local-strategy-server.js

---

## Key Concepts

This "Machine" uses a **Cookie** (Çerez) to remember who you are.

| Concept | Description |
|:---|:---|
| **`express-session`** | The **"Hafıza" (Memory)**. This middleware creates a session store on the server and gives the client a "Giriş Kartı" (Cookie). |
| **`passport-local`** | The **"Motor" (Engine)**. The `Strategy` that runs on `/login`, checks the `username`/`password`, and uses `bcrypt.compare()`. |
| **`passport.serializeUser`** | The **"Küçültücü" (Minimizer)**. Tells Passport: "Tüm kullanıcı nesnesini 'Hafıza'ya kaydetme. Sadece `user.id`'sini al ve Çereze yaz." |
| **`passport.deserializeUser`** | The **"Geri Yükleyici" (Restorer)**. Tells Passport: "Çerezdeki `id`'yi al, veritabanına git, tam kullanıcı nesnesini bul ve `req.user` içine koy." |
| **`req.isAuthenticated()`** | The **"Kapı Görevlisi" (Gatekeeper)**. `express-session`'ın "Hafıza"sını kontrol eder. `true` (kapıyı aç) veya `false` (kapıyı kapat) döndürür. |

---

## Takeaways
- This is a **STATEFUL** architecture. The server *must* store (remember) the user's session, either in RAM (bad for scaling) or a central store like `Redis`.
- The **Cookie is everything**. The entire process relies on the browser (or Postman) automatically sending the session cookie back with *every* request.
- This is why your "Postman `/login` -> Tarayıcı `/profile`" test failed. They are two different "customers" with two different "cookie jars".

---

## Real-World Relevance (The "Fark Yaratan Analiz")
- **The Interview Question:** "How does `passport-local` work?"
- **The "Tool" Answer:** "It checks a username and password."
- **The "Architect" (Senior) Answer:** "It's a 'stateful' strategy. On login, `passport-local` validates credentials (via `bcrypt`), and on success, `passport.serializeUser` saves a minimal user ID to the `express-session` store. `express-session` then sends a signed cookie to the client. On subsequent requests, `req.isAuthenticated()` triggers `passport.deserializeUser` to fetch the full user from the DB using the ID from the cookie, populating `req.user`. Its main 'trade-off' is that it doesn't scale across multiple servers unless you use a shared session store like `Redis`."

---

## How to Run
First, install all machine parts:
```bash
npm install express passport passport-local express-session bcryptjs
```

Run the server:
```bash
node src/08-authentication/03-passport-local/01-local-strategy-server.js
```