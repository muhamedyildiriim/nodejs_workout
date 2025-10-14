/**
 * Topic: Error Handling → Core Concepts → Basic Error Object
 * Purpose: Demonstrates how the built-in Error object works in Node.js and what properties it provides.
 * Key Points:
 *  - Every error has name, message, and stack properties
 *  - You can extend Error to create meaningful, domain-specific types
 * Run: node src/03-error-handlings/01-core-concepts/errors/01-basic-errors.js
 * Expected:
 *  - Logs details of a thrown Error object
 *  - Shows stack trace and custom error handling output
 */

// ======== Basic Error Object Example ========

// 1) Creating a simple error
const error = new Error("Something went wrong!");

// 2) Printing built-in properties
console.log("Name:", error.name);       // "Error"
console.log("Message:", error.message); // "Something went wrong!"
console.log("Stack:", error.stack.split("\n")[0]); // only first line

// 3) Throwing and catching an error
try {
  throw new Error("This is a caught error");
} catch (err) {
  console.log("\n--- Caught Error Example ---");
  console.log("Type:", err.name);
  console.log("Message:", err.message);
  console.log("First Stack Line:", err.stack.split("\n")[1]);
}

// 4) Customizing the name for readability
const loginError = new Error("Invalid credentials");
loginError.name = "AuthenticationError";
console.log("\n--- Custom Named Error ---");
console.log(`${loginError.name}: ${loginError.message}`);

// 5) Attaching extra context (modern pattern)
const errWithContext = new Error("Payment failed", {
  cause: { orderId: 452, reason: "Insufficient balance" },
});
console.log("\n--- Error with Cause ---");
console.log("Message:", errWithContext.message);
console.log("Cause:", errWithContext.cause);