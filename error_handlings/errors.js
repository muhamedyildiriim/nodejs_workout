// ============================================
// =========== REFERENCE CHEATSHEET ===========
// ============================================

/*
🧩 1️⃣ System Errors

Source: Operating System (OS)
Examples: ENOENT (file not found), ECONNREFUSED (connection refused), EISDIR (is a directory)
Catching: try/catch + err.code
Use in: fs, net, http, dns, etc.


🧩 2️⃣ User Specified Errors (Custom / AppError)

Source: Your application/business logic
Examples: “User not found”, “Invalid token”, “Missing field”
Catching: try/catch
Use in: REST APIs, service layer, form validation


🧩 3️⃣ Assertion Errors

Source: assert module or your own condition checks
Example: assert.strictEqual(a, b) fails
Catching: try/catch
Use in: Test / Development (logical validation)


🧩 4️⃣ JavaScript Errors

Source: JavaScript runtime itself
Subtypes:
| Type           | When                             |
|----------------|----------------------------------|
| TypeError      | Wrong type usage (e.g., 5())     |
| ReferenceError | Accessing an undefined variable  |
| SyntaxError    | Invalid syntax                   |
| RangeError     | Out-of-range value               |
| URIError       | Invalid URI decode               |
| EvalError      | eval error (rare)                |
| AggregateError | Multiple errors (Promise.any)    |

Catching: try/catch
Use: Usually a code bug → fix the code


🧩 5️⃣ Types of Errors (Summary)

This is a “category guide”.
Meaning: answers “Which class does this error belong to?”
It is the umbrella over the 4 types above.


🧩 6️⃣ Uncaught Exceptions

Source: Errors not caught anywhere
Example: throw new Error() without try/catch
Catching: process.on('uncaughtException')
Use: Log before exit, close resources


🧩 7️⃣ Promise / Async Errors (we covered the basics)

Source: Promise rejection; missing catch
Example: Error in async function without try/catch
Catching: .catch() or try/catch + await
Use: Always await and handle errors in async flows

💡 This is the foundation of “Handling Async Errors”.
We touched .then().catch() and try/catch + await, but we’ll detail
“Unhandled Promise Rejection” separately.
*/