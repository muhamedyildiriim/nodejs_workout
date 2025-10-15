/**
 * Topic: Async Programming → EventEmitter → Real-World Logger
 * Purpose: Demonstrates an event-driven logging pipeline that emits events after durable writes.
 * Key Points:
 *  - Decouples log persistence from side-effects via EventEmitter
 *  - Emits "logged" only after successful append for durability
 *  - Enables async subscribers (metrics, telemetry, webhooks) without blocking
 * Run: node src/04-async-programming/07-event-emitter/02-emitter-realworld-logger.js
 * Expected:
 *  - Appends a timestamped line to app.log
 *  - Logs: "Logged: Server started"
 */

import { EventEmitter } from "node:events";
import { appendFile } from "node:fs/promises";

class Logger extends EventEmitter {
  async log(msg) {
    const line = `${new Date().toISOString()} ${msg}\n`;
    await appendFile("app.log", line); // ensures write completed before emitting
    this.emit("logged", msg);
  }
}

const logger = new Logger();

// Subscribers react asynchronously after write
logger.on("logged", (m) => console.log("Logged:", m));

// Emit a durable log event
await logger.log("Server started");

/*
Notes:
- This pattern separates I/O durability from event notifications.
- Real systems may include retries, buffering, and backpressure handling.
- Useful for observability pipelines: audit logs, metrics, analytics triggers.
- Always emit after the write completes to prevent race conditions.
*/