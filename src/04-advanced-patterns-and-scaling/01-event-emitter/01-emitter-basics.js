/**
 * File: /04-advanced-patterns-and-scaling/01-event-emitter/01-emitter-basics.js
 * Topic: Advanced Patterns → EventEmitter → Core Concepts
 * Purpose: Demonstrates the core publish/subscribe
 * pattern in Node.js using the built-in `EventEmitter`.
 *
 * Key Points:
 * - `EventEmitter` is a built-in class (no install needed).
 * - `emitter.on(eventName, listener)`: Subscribes a listener to an event.
 * - `emitter.emit(eventName, ...args)`: Publishes an event,
 * calling all listeners for it.
 * - `emitter.once(eventName, listener)`: Subscribes a listener
 * that runs only *one time*.
 * - `emitter.off(eventName, listener)`: Unsubscribes a listener
 * to prevent "memory leaks".
 *
 * Run: node src/04-advanced-patterns-and-scaling/01-event-emitter/01-emitter-basics.js
 * Expected:
 * - "Event: app:start (v1.0.0)"
 * - "Event: data (Chunk 1)"
 * - "Event: data (Chunk 2)"
 * - "Event: app:shutdown"
 */

import { EventEmitter } from "node:events";

// Custom class extends EventEmitter to gain its capabilities.
class AppBus extends EventEmitter {}

const appBus = new AppBus();

// --- 1. The Listeners (Subscribers) ---

// `on`: This listener will fire *every time* 'data' is emitted.
const onDataReceived = (data) => {
  console.log(`Event: data (${data})`);
};
appBus.on("data", onDataReceived);

// `once`: This listener will fire *only once* and then remove itself.
appBus.once("app:start", (version) => {
  console.log(`Event: app:start (v${version})`);
});

// A listener for the shutdown event
const onShutdown = () => {
  console.log("Event: app:shutdown");
};
appBus.on("app:shutdown", onShutdown);

// --- 2. The Publisher (Emitting Events) ---

console.log("--- Emitting events... ---");

// This will fire the `once` listener
appBus.emit("app:start", "1.0.0");

// This will *not* fire, as the `once` listener is now gone
appBus.emit("app:start", "1.0.1");

// These will fire the `on('data', ...)` listener
appBus.emit("data", "Chunk 1");
appBus.emit("data", "Chunk 2");

// --- 3. Cleaning Up (Preventing Memory Leaks) ---
// It's good practice to remove listeners when they are no longer needed.
appBus.off("data", onDataReceived);

// This 'data' event will *not* be logged, as the listener was removed.
appBus.emit("data", "Chunk 3 (Ignored)");

// This will still fire
appBus.emit("app:shutdown");

// Notes:
// - This is the "Observer Pattern".
// - Many Node.js core modules (like `fs.createReadStream` and `http.Server`)
//   are `EventEmitters` "under the hood".