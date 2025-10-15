/**
 * Topic: Async Programming → Streams & Backpressure → pipeline()
 * Purpose: Demonstrates efficient, chunked I/O using Node.js streams with automatic backpressure handling.
 * Key Points:
 *  - Streams process data in chunks instead of loading everything into memory
 *  - pipeline() composes streams and forwards errors automatically
 *  - Ideal for large files, ETL pipelines, or network data flows
 * Run: node src/04-async-programming/11-streams-and-backpressure/01-stream-pipeline.js
 * Expected:
 *  - Copies bigfile.src to bigfile.dst efficiently with minimal memory usage
 */

import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";

await pipeline(
  createReadStream("bigfile.src"),
  createWriteStream("bigfile.dst")
);

/*
Notes:
- Streams are event-driven, memory-efficient I/O abstractions in Node.js.
- Backpressure automatically regulates flow between readable and writable streams.
- Use pipeline() to simplify error propagation and cleanup.
- Tune highWaterMark for performance; enable objectMode for structured data.
- Common use cases: file transfer, compression, HTTP proxies, log processing.
*/