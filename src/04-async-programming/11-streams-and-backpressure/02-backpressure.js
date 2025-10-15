/**
 * Topic: Async Programming → Streams & Backpressure → Flow Control
 * Purpose: Demonstrates how Node.js streams regulate producer/consumer speed to prevent memory bloat.
 * Key Points:
 *  - stream.write() returns false when the internal buffer is full
 *  - Wait for the 'drain' event before resuming writes
 *  - Backpressure maintains steady throughput and avoids unbounded buffers
 * Run: node src/04-async-programming/11-streams-and-backpressure/02-backpressure.js
 * Expected:
 *  - Writes complete smoothly without overwhelming the slow consumer
 */

import { Writable } from "node:stream";

const slowSink = new Writable({
  write(chunk, enc, cb) {
    setTimeout(() => cb(), 10); // simulate slow consumer
  },
});

let i = 0;
function produce(n = 10_000) {
  let canWrite = true;
  while (i < n && canWrite) {
    const buf = Buffer.from(`line-${i}\n`);
    canWrite = slowSink.write(buf); // false = backpressure signal
    i++;
  }
  if (i < n) {
    slowSink.once("drain", () => produce(n)); // resume when ready
  } else {
    slowSink.end();
  }
}

produce(1000);

/*
Notes:
- Backpressure ensures a producer doesn't write faster than the consumer can process.
- Check stream.write() return values and pause/resume appropriately.
- For sockets or HTTP streams, implement timeouts and rate limits.
- Ignoring pressure signals leads to memory bloat and unstable throughput.
- Real-world: log ingestion, telemetry streams, and high-throughput message pipelines.
*/