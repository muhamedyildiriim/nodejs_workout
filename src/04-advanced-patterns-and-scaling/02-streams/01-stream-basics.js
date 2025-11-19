/**
 * File: /04-advanced-patterns-and-scaling/02-streams/01-stream-basics.js
 * Topic: Advanced Patterns → Streams → Core Concepts (Readable/Writable)
 * Purpose: Demonstrates the *fundamental* "Readable" and "Writable" streams.
 *
 * Key Points:
 * - A `Stream` is a sequence of data (chunks) moved over time.
 * - `Readable`: The "faucet" (e.g., `fs.createReadStream`, `http.IncomingMessage`).
 * We listen to its `data` and `end` events.
 * - `Writable`: The "drain" (gider) (e.g., `fs.createWriteStream`, `http.ServerResponse`).
 * We call its `.write(chunk)` and `.end()` methods.
 * - This "event-based" model is memory-efficient.
 *
 * Run: node src/04-advanced-patterns-and-scaling/02-streams/01-stream-basics.js
 * Expected:
 * - Logs "Writable: Received chunk: HELLO"
 * - Logs "Writable: Received chunk: WORLD"
 * - Logs "Writable: No more data."
 */

import { Readable, Writable } from "node:stream";

// --- 1. The "Faucet" - A Readable Stream ---
// We create a *custom* readable stream that "pumps"
// data from an array.
class MyReadableStream extends Readable {
  constructor(data) {
    super();
    this.data = data;
  }
  // The `_read` method is called when the stream is ready to push data
  _read() {
    if (this.data.length === 0) {
      this.push(null); // `null` signals the "end" of the stream
    } else {
      this.push(this.data.shift()); // Push the next chunk
    }
  }
}

// --- 2. The "Drain" - A Writable Stream ---
// We create a *custom* writable stream that just logs to the console.
class MyWritableStream extends Writable {
  // The `_write` method is called for *every chunk* pushed by
  // the readable stream.
  _write(chunk, encoding, callback) {
    // `chunk` is a `Buffer`. We convert it to a string.
    console.log(`Writable: Received chunk: ${chunk.toString().toUpperCase()}`);
    callback(); // Call callback when this chunk is "handled"
  }

  _final(callback) {
    console.log("Writable: No more data.");
    callback();
  }
}

// --- 3. The "Manual" Connection ---
// (In the next file, `.pipe()` will automate this)
const source = new MyReadableStream(["Hello", "World"]);
const destination = new MyWritableStream();

// We manually "listen for events from the "faucet"
source.on("data", (chunk) => {
  // And manually "write" to the "drain"
  destination.write(chunk);
});

source.on("end", () => {
  destination.end(); // We must manually close the "drain"
});