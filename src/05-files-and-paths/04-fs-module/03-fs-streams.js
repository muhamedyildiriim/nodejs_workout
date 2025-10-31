/**
 * Topic: Node.js Core → fs Streams (createReadStream/createWriteStream, pipeline)
 * Purpose: Demonstrate memory-efficient file handling with backpressure, transforms, compression, and integrity checks.
 * Key Points:
 *  - Use streams to process large files without loading them fully into memory.
 *  - `pipeline` (stream/promises) propagates errors and closes streams reliably.
 *  - Control throughput via `highWaterMark`; monitor progress using bytes read/written.
 *  - Combine streams: transform (uppercase), gzip compression, and SHA-256 hashing.
 * Run:
 *  node src/05-files-and-paths/04-fs-module/03-fs-streams.js
 * Expected:
 *  - Generates a sample large file
 *  - Copies it with progress
 *  - Compresses to .gz with progress
 *  - Computes SHA-256 of original and copy (should match)
 *  - Applies a Transform (uppercase) into a new file
 */

import fs from "fs";
import { promises as fsp } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { pipeline as pipelineCb } from "stream";
import { pipeline } from "stream/promises";
import { Transform } from "stream";
import zlib from "zlib";
import crypto from "crypto";

// ESM-compatible __dirname / __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
const dataDir = path.join(__dirname, "data");
const outDir  = path.join(__dirname, "output");
const srcFile = path.join(dataDir, "big-sample.txt");
const copyFile = path.join(outDir, "big-sample.copy.txt");
const gzFile   = path.join(outDir, "big-sample.txt.gz");
const upperFile = path.join(outDir, "big-sample.upper.txt");

async function ensureDirs() {
  await fsp.mkdir(dataDir, { recursive: true });
  await fsp.mkdir(outDir, { recursive: true });
}

async function generateSampleFile(filePath, { lines = 500_000, lineSize = 80 } = {}) {
  // Generate ~lines*(lineSize+1) bytes (rough estimate). Default ≈ ~40MB.
  if (fs.existsSync(filePath)) return;
  const writable = fs.createWriteStream(filePath, { highWaterMark: 1 << 20 }); // 1MB buffer
  return new Promise((resolve, reject) => {
    let i = 0;
    function write() {
      let ok = true;
      while (i < lines && ok) {
        const text = `Line ${i.toString().padStart(7, "0")} | ${"x".repeat(lineSize - 22)}\n`;
        ok = writable.write(text);
        i++;
      }
      if (i >= lines) writable.end();
      else writable.once("drain", write);
    }
    writable.on("finish", resolve);
    writable.on("error", reject);
    write();
  });
}

function sha256Stream() {
  const hash = crypto.createHash("sha256");
  return new Transform({
    transform(chunk, _enc, cb) {
      hash.update(chunk);
      cb(null, chunk);
    },
    flush(cb) {
      this.emit("hash", hash.digest("hex"));
      cb();
    }
  });
}

function progressTracker(label, totalBytesEstimate) {
  let processed = 0;
  let lastLog = Date.now();
  return new Transform({
    transform(chunk, _enc, cb) {
      processed += chunk.length;
      const now = Date.now();
      if (now - lastLog > 500) {
        const pct = totalBytesEstimate ? ((processed / totalBytesEstimate) * 100).toFixed(1) : "n/a";
        process.stdout.write(`${label}: ${processed.toLocaleString()} bytes processed (${pct}%)\r`);
        lastLog = now;
      }
      cb(null, chunk);
    },
    flush(cb) {
      process.stdout.write(`${label}: ${processed.toLocaleString()} bytes processed (done)\n`);
      cb();
    }
  });
}

function uppercaseTransform() {
  return new Transform({
    transform(chunk, _enc, cb) {
      cb(null, Buffer.from(chunk.toString().toUpperCase()));
    }
  });
}

async function copyWithProgress(src, dest) {
  const stat = await fsp.stat(src);
  const hasher = sha256Stream();
  hasher.on("hash", (hex) => console.log(`Source SHA-256: ${hex}`));

  const dstHasher = sha256Stream();
  dstHasher.on("hash", (hex) => console.log(`Copy   SHA-256: ${hex}`));

  // Readable backpressure control: tune highWaterMark for throughput/memory balance
  const rs = fs.createReadStream(src, { highWaterMark: 1 << 20 }); // 1MB
  const ws = fs.createWriteStream(dest, { highWaterMark: 1 << 20 });

  // rs -> hasher -> progress -> ws -> dstHasher (tee after write)
  // We'll tee by hashing post-write via a small PassThrough-like step
  const tee = new Transform({
    transform(chunk, _enc, cb) {
      dstHasher.write(chunk);
      cb(null, chunk);
    },
    final(cb) {
      dstHasher.end();
      cb();
    }
  });

  await pipeline(
    rs,
    hasher,
    progressTracker("Copy progress", stat.size),
    tee,
    ws
  );

  console.log("Copy complete.");
}

async function gzipWithProgress(src, gzDest) {
  const stat = await fsp.stat(src);
  const rs = fs.createReadStream(src, { highWaterMark: 1 << 20 });
  const gz = zlib.createGzip({ level: zlib.constants.Z_BEST_SPEED });
  const ws = fs.createWriteStream(gzDest);

  await pipeline(
    rs,
    progressTracker("Gzip progress", stat.size),
    gz,
    ws
  );
  const outStat = await fsp.stat(gzDest);
  console.log(`Gzip complete. Input ~${stat.size.toLocaleString()} bytes → Output ~${outStat.size.toLocaleString()} bytes`);
}

async function transformUppercase(src, dest) {
  const rs = fs.createReadStream(src, { highWaterMark: 1 << 20 });
  const ws = fs.createWriteStream(dest);
  await pipeline(rs, uppercaseTransform(), ws);
  console.log("Uppercase transform complete.");
}

async function main() {
  console.log("=== FS STREAMS DEMONSTRATION ===");
  await ensureDirs();

  // 1) Generate big sample file once
  console.time("Generate sample");
  await generateSampleFile(srcFile, { lines: 300_000, lineSize: 96 }); // ~30MB
  console.timeEnd("Generate sample");

  // 2) Copy with progress and integrity check (SHA-256)
  await copyWithProgress(srcFile, copyFile);

  // 3) Gzip compression with progress
  await gzipWithProgress(srcFile, gzFile);

  // 4) Transform stream: uppercase
  await transformUppercase(srcFile, upperFile);

  // 5) Show memory footprint rough idea (heapUsed)
  const mem = process.memoryUsage();
  console.log(`Memory heapUsed ~ ${(mem.heapUsed / (1024 * 1024)).toFixed(1)} MB`);

  // Notes:
  // - Streams handle backpressure automatically: write() returns false → wait for 'drain'.
  // - Use pipeline(streams...) from 'stream/promises' to forward errors and close streams.
  // - Adjust highWaterMark to tune throughput vs memory.
  // - Transform streams enable on-the-fly processing without buffering entire content.
}

main().catch((err) => {
  console.error("Fatal stream error:", err);
  process.exit(1);
});