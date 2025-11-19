/**
 * File: /04-advanced-patterns-and-scaling/02-streams/04-backpressure.js
 * Topic: Advanced Patterns → Streams → Backpressure (The "Clogged Drain")
 * Purpose: Demonstrates the "difference-making" concept of **Backpressure**.
 *
 * "The Architecture":
 * - **The Problem:** What if the `Readable` stream (e.g., fast disk)
 * is *faster* than the `Writable` stream (e.g., slow network)?
 * - The `Readable` stream will "flood" the `Writable` stream.
 * - The data "chunks" will buffer in RAM.
 * - This *defeats the purpose* of streams and
 * will *crash the server* (the "Memory Problem" again).
 * - **The Solution: Backpressure**
 * 1. `writable.write(chunk)` returns `false` if its buffer is full
 * (The "drain" says: "I'm clogged!").
 * 2. When the "drain" sees this, it *must* `readable.pause()`
 * (The "faucet" is turned off).
 * 3. We listen for the `writable.on('drain', ...)` event
 * (The "drain" says: "I'm clear!").
 * 4. We then `readable.resume()` (The "faucet" is turned back on).
 *
 * **`pipe()` and `pipeline()` do all of this automatically.**
 * This file just *proves* the "magic" they handle.
 *
 * Run: node src/04-advanced-patterns-and-scaling/02-streams/04-backpressure.js
 * Expected:
 * - "Write returned false! Pausing read stream... (Buffer full)"
 * - "DRAIN event received. Resuming read stream..."
 */

import { Readable, Writable } from "node:stream";

// 1. A *very fast* "faucet"
const readableStream = new Readable({
  highWaterMark: 16, // Tiny buffer (16 bytes)
  read() {},
});

// 2. A *very slow* "drain"
const writableStream = new Writable({
  highWaterMark: 16,
  write(chunk, encoding, callback) {
    // Simulate a slow database or network write (100ms)
    setTimeout(() => {
      console.log(`Writing chunk: ${chunk.toString()}`);
      callback();
    }, 100);
  },
});

let i = 0;

function write() {
  while (i < 20) {
    i++;
    const chunk = `Chunk ${i}`;
    // Try to write the chunk
    const canWrite = writableStream.write(chunk);

    if (i === 20) {
      // Last chunk
      writableStream.end();
      break;
    }

    // This is the "Backpressure" concept!
    if (!canWrite) {
      // The writable buffer is full!
      console.log("Write returned false! Pausing read stream... (Buffer full)");
      // We *must* wait for the 'drain' event.
      writableStream.once("drain", () => {
        console.log("DRAIN event received. Resuming read stream...");
        write(); // Resume writing
      });
      return; // Stop the `while` loop
    }
  }
}

// Start the process
write();