/**
 * Topic: Async Programming → EventEmitter → Fundamentals
 * Purpose: Demonstrates the core pub/sub pattern in Node.js using EventEmitter.
 * Key Points:
 *  - Enables decoupled communication between modules via named events
 *  - Use once() for one-time listeners; remove listeners to prevent leaks
 *  - Always handle the 'error' event explicitly
 * Run: node src/04-async-programming/07-event-emitter/01-emitter-basic.js
 * Expected:
 *  - Logs "ready: 1.0.0", "user.created: 42", and "bus error: something went wrong"
 */

import { EventEmitter } from "node:events";

class Bus extends EventEmitter {}
const bus = new Bus();

// Single-use listener: runs only once
bus.once("ready", (meta) => {
  console.log("ready:", meta.version);
});

// Persistent listener: can trigger multiple times
const onUserCreated = (user) => console.log("user.created:", user.id);
bus.on("user.created", onUserCreated);

// Error event must always be handled to prevent process crash
bus.on("error", (err) => console.error("bus error:", err.message));

// Emit events
bus.emit("ready", { version: "1.0.0" });
bus.emit("user.created", { id: 42 });

// Clean up listener to avoid memory leaks
bus.off("user.created", onUserCreated);

// Emit a handled error
bus.emit("error", new Error("something went wrong"));

/*
Notes:
- EventEmitter implements the observer pattern for in-process events.
- Core Node subsystems (streams, http, process) are EventEmitters internally.
- Good practice: document event names and payload schemas.
- Use once() for lifecycle or initialization events that should not repeat.
- Always add an 'error' listener — unhandled errors crash the process.
*/