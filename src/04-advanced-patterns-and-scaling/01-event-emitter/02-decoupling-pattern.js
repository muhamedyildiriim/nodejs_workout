/**
 * File: /04-advanced-patterns-and-scaling/01-event-emitter/02-decoupling-pattern.js
 * Topic: Advanced Patterns → EventEmitter → Decoupling (The Use Case)
 * Purpose: Demonstrates the "difference-making" use of `EventEmitter`: **Decoupling**.
 *
 * "The Architecture":
 * - **The Problem:** We want a `UserService` to send a welcome email
 * and log the registration *without* `UserService`
 * *knowing* that `EmailService` or `LoggingService` exist.
 * - **The "Anti-Pattern":**
 * `import EmailService from './email.js';`
 * `EmailService.send(user);` // This is "Tightly-Coupled"
 * - **The Solution (Observer Pattern):**
 * 1. A central `appEmitter` is created.
 * 2. `UserService` *only* knows how to `emit('user:created', user)`.
 * 3. `EmailService` and `LoggingService` *listen* (`on('user:created')`).
 *
 * "The Win":
 * - `UserService` is now "decoupled" and "testable".
 * - We can add 10 more "listeners" (e.g., `SlackService`,
 * `AnalyticsService`) *without ever changing* the `UserService` code.
 *
 * Run: node src/04-advanced-patterns-and-scaling/01-event-emitter/02-decoupling-pattern.js
 * Expected:
 * - "LOG: [UserService] Registering user 'test@user.com'..."
 * - "LOG: [LoggingService] User created: test@user.com"
 * - "LOG: [EmailService] Sending welcome email to test@user.com"
 * - "LOG: [UserService] User registration complete."
 */

import { EventEmitter } from "node:events";

// 1. The "Central Bus"
// This is the *only* thing the services know about.
const appEmitter = new EventEmitter();

// --- Service 1: LoggingService (The Listener) ---
class LoggingService {
  constructor() {
    // This service *listens* for the event
    appEmitter.on("user:created", (user) => {
      this.logUser(user);
    });
  }

  logUser(user) {
    console.log(`LOG: [LoggingService] User created: ${user.email}`);
  }
}

// --- Service 2: EmailService (Another Listener) ---
class EmailService {
  constructor() {
    // This service *also listens* for the *same* event
    appEmitter.on("user:created", (user) => {
      this.sendWelcomeEmail(user);
    });
  }

  sendWelcomeEmail(user) {
    console.log(`LOG: [EmailService] Sending welcome email to ${user.email}`);
  }
}

// --- Service 3: UserService (The Publisher) ---
class UserService {
  // Note: This service does *not* `import` or `require`
  // the LoggingService or EmailService. It is "decoupled".

  register(email) {
    console.log(`LOG: [UserService] Registering user '${email}'...`);
    const user = { id: 1, email };

    // ... (Database logic to save the user) ...

    // Instead of calling services directly, it *emits an event*.
    // It doesn't know (or care) who is listening.
    console.log("LOG: [UserService] Emitting 'user:created' event...");
    appEmitter.emit("user:created", user);

    console.log("LOG: [UserService] User registration complete.");
  }
}

// --- Application "Bootstrap" ---
// In a real app, this happens in your main `index.js` or `server.js`.

// 1. Initialize the listeners
new LoggingService();
new EmailService();

// 2. Initialize the publisher
const userService = new UserService();

// 3. Run the "real-world" operation
userService.register("test@user.com");