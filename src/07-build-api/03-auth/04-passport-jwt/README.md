# Authentication: Passport.js (Stateless with JWT)

**Goal:** Learn the **"Stateless" (Durum Tutmayan)** authentication model using `passport-jwt`. This is the modern standard for scalable APIs (Mobile, React, Netflix/Uber).

---

## Structure
04-passport-jwt/
└─ 01-jwt-strategy-server.js

---

## Key Concepts

This "Machine" uses a **Token** (Jeton) that the client must manually carry.

| Concept | Description |
|:---|:---|
| **`express-session` (YOK)** | **CRITICAL:** Bu mimaride "Hafıza" yoktur. Sunucu, kullanıcıyı *hatırlamaz*. |
| **`/login` Route** | Bu, korumasız (unprotected) bir rotadır. Tek işi `bcrypt`'i kontrol etmek ve başarılı olursa `jwt.sign()` ile bir "Jeton" imzalamaktır. |
| **`passport-jwt`** | The **"Kapı Görevlisi" (Gatekeeper)**. `passport-jwt` stratejisi, `passport-local`'in yerini alır. |
| **`ExtractJwt`** | The **"Göz" (Eye)**. `passport-jwt`'ye jetonu nerede arayacağını söyler (örn: `Authorization: Bearer <token>` başlığında). |
| **`{ session: false }`** | The **"Kural" (Rule)**. `passport.authenticate()`'e "Sakın 'Hafıza'ya (session) bakma, bu 'Stateless' bir işlem" demenin yoludur. |
| **Bearer Token** | "Giriş Kartı". Sunucu bunu *verir* ama *saklamaz*. Saklamak ve her istekte geri getirmek **Müşterinin (Client)** sorumluluğudur. |

---

## Takeaways
- This is a **STATELESS** architecture. The server *verifies* the token's signature (`jwt.verify()`) but does not *remember* the user.
- Any server (Sunucu A, Sunucu B, ...Sunucu 10.000) `JWT_SECRET`'i bildiği sürece, o jetonu doğrulayabilir. **This is scalability (Ölçeklenebilirlik).**
- The **Client** (e.g., mobile app, React app) has more responsibility: it must securely store the token and attach it to every protected request.

---

## Real-World Relevance (The "Fark Yaratan Analiz")
- **The Interview Question:** "How do you build an API for a mobile app or a React frontend?"
- **The "Architect" (Senior) Answer:** "You must use a 'stateless' architecture, as you can't rely on browser cookies. We use `passport-jwt`. The `/login` route validates credentials and issues a signed, short-lived JWT (Access Token). The client then sends this token in the `Authorization: Bearer ...` header. Our `passport-jwt` strategy, configured with `{ session: false }`, extracts and verifies this token on every protected request. This is highly scalable (her sunucuda çalışır) and decouples the frontend from the backend."

---

## How to Run
First, install all machine parts:
```bash
npm install express passport passport-jwt jsonwebtoken dotenv
```

Run the server:
```bash
node src/08-authentication/04-passport-jwt/01-jwt-strategy-server.js
```