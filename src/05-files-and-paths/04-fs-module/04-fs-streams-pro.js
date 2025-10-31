/**
 * Topic: Node.js Core → Advanced Streams (Abort, NDJSON, Fan-out)
 * Purpose: Demonstrate abortable pipelines, line-delimited JSON (NDJSON) streaming parse,
 *          and multi-destination fan-out with proper backpressure and cleanup.
 * Key Points:
 *  - AbortController + pipeline({ signal }) to cancel long-running stream operations.
 *  - Transform to split lines and parse NDJSON without loading entire file into memory.
 *  - PassThrough tee to write the same stream data into multiple destinations (fan-out).
 *  - Robust error handling and resource cleanup.
 * Run:
 *   1) Normal run (no abort):
 *      node src/05-files-and-paths/05-fs-module/04-fs-streams-pro.js
 *
 *   2) Abort after N milliseconds (e.g., 1500ms):
 *      ABORT_MS=1500 node src/05-files-and-paths/05-fs-module/04-fs-streams-pro.js
 *
 * Expected:
 *  - Generates a NDJSON dataset once.
 *  - Streams it: parses, filters, aggregates, and writes two outputs via fan-out.
 *  - If ABORT_MS is set, the pipeline aborts gracefully.
 */

import fs from "fs";
import { promises as fsp } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { Transform, PassThrough } from "stream";
import { pipeline } from "stream/promises";

// ESM-compatible __dirname / __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
const dataDir = path.join(__dirname, "data");
const outDir  = path.join(__dirname, "output");
const ndjson  = path.join(dataDir, "dataset.ndjson");
const outFiltered = path.join(outDir, "filtered.ndjson");
const outAll      = path.join(outDir, "all.ndjson");
const outStats    = path.join(outDir, "stats.json");

// Abort setup (optional)
const ABORT_MS = Number(process.env.ABORT_MS || 0);

// ---------- Utilities ----------
async function ensureDirs() {
  await fsp.mkdir(dataDir, { recursive: true });
  await fsp.mkdir(outDir, { recursive: true });
}

function randomItem(i) {
  // Deterministic-ish content for demo
  const categories = ["alpha", "beta", "gamma", "delta"];
  const cat = categories[i % categories.length];
  const score = (i * 17) % 101; // 0..100
  return { id: i, name: `item-${i}`, category: cat, score };
}

async function generateNDJSON(filePath, { rows = 200_000 } = {}) {
  if (fs.existsSync(filePath)) return; // generate once
  const ws = fs.createWriteStream(filePath, { highWaterMark: 1 << 20 });
  await new Promise((resolve, reject) => {
    let i = 0;
    function write() {
      let ok = true;
      while (i < rows && ok) {
        const obj = randomItem(i);
        ok = ws.write(JSON.stringify(obj) + "\n");
        i++;
      }
      if (i >= rows) ws.end();
      else ws.once("drain", write);
    }
    ws.on("finish", resolve);
    ws.on("error", reject);
    write();
  });
}

// ---------- Transforms ----------
function lineSplitter() {
  // Splits binary chunks into newline-delimited strings
  let carry = "";
  return new Transform({
    readableObjectMode: true,
    transform(chunk, _enc, cb) {
      carry += chunk.toString("utf8");
      const lines = carry.split("\n");
      carry = lines.pop() ?? "";
      for (const ln of lines) {
        if (ln.length) this.push(ln);
      }
      cb();
    },
    flush(cb) {
      if (carry.length) this.push(carry);
      cb();
    }
  });
}

function ndjsonParser() {
  // Converts lines into objects; skips invalid JSON lines
  return new Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    transform(line, _enc, cb) {
      try {
        const obj = JSON.parse(line);
        this.push(obj);
      } catch {
        // ignore malformed line
      }
      cb();
    }
  });
}

function objectFilter(predicate) {
  // Filters objects by predicate
  return new Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    transform(obj, _enc, cb) {
      if (predicate(obj)) this.push(obj);
      cb();
    }
  });
}

function objectStringifier() {
  // Emits NDJSON strings from objects
  return new Transform({
    writableObjectMode: true,
    transform(obj, _enc, cb) {
      cb(null, JSON.stringify(obj) + "\n");
    }
  });
}

function statsAggregator() {
  // Aggregates stats as objects pass through
  const stats = {
    total: 0,
    byCategory: Object.create(null),
    sumScore: 0,
    maxScore: -Infinity,
    minScore: +Infinity,
  };
  return new Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    transform(obj, _enc, cb) {
      stats.total++;
      stats.sumScore += obj.score ?? 0;
      if (obj.score > stats.maxScore) stats.maxScore = obj.score;
      if (obj.score < stats.minScore) stats.minScore = obj.score;
      const c = obj.category ?? "unknown";
      stats.byCategory[c] = (stats.byCategory[c] || 0) + 1;
      // pass-through
      this.push(obj);
      cb();
    },
    final(cb) {
      this.emit("stats", {
        ...stats,
        avgScore: stats.total ? stats.sumScore / stats.total : 0,
      });
      cb();
    }
  });
}

// Tee helper: fan-out to multiple write streams with proper end
function makeFanOut(writableStreams) {
  const tee = new PassThrough();
  for (const ws of writableStreams) {
    tee.pipe(ws, { end: true });
  }
  return tee;
}

// ---------- Main pipeline ----------
async function processNDJSON({ abortMs = 0 } = {}) {
  const controller = new AbortController();
  const { signal } = controller;

  // Optional timed abort
  let timeout;
  if (abortMs > 0) {
    timeout = setTimeout(() => controller.abort(new Error(`Aborted after ${abortMs}ms`)), abortMs);
  }

  // Sources and sinks
  const rs = fs.createReadStream(ndjson, { highWaterMark: 1 << 20 });
  const wsAll = fs.createWriteStream(outAll);
  const wsFiltered = fs.createWriteStream(outFiltered);

  // Build stream graph:
  // rs -> lineSplitter -> ndjsonParser -> stats -> (fan-out branch)
  // Branch A: stringify -> wsAll
  // Branch B: filter(score>=80) -> stringify -> wsFiltered
  const splitter = lineSplitter();
  const parser = ndjsonParser();
  const stats = statsAggregator();

  // Branch A (all)
  const toAll = objectStringifier();

  // Branch B (filtered)
  const filterHigh = objectFilter((o) => typeof o.score === "number" && o.score >= 80);
  const toFiltered = objectStringifier();

  // We need to duplicate the object stream to two branches; simplest approach:
  // 1) Convert object stream to NDJSON (branch A)
  // 2) Also pipe objects through filter then stringify (branch B)
  // We'll accomplish this by:
  // - piping `stats` to two separate Transform chains using a manual on('data') dispatcher.
  // Alternatively, one can use broadcast streams; here we keep it explicit and readable.

  // Dispatcher: takes objects from `stats` and writes to both chains respecting backpressure
  const dispatcher = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    transform(obj, _enc, cb) {
      // Write to branch A
      const aOk = toAll.write(obj);
      // Write to branch B
      const bOk = filterHigh.write(obj);
      // Backpressure handling: wait 'drain' if needed
      if (!aOk || !bOk) {
        let pending = 0;
        const onDrain = () => {
          pending--;
          if (pending === 0) cb();
        };
        if (!aOk) { pending++; toAll.once("drain", onDrain); }
        if (!bOk) { pending++; filterHigh.once("drain", onDrain); }
        if (pending === 0) cb();
      } else {
        cb();
      }
    },
    final(cb) {
      toAll.end();
      filterHigh.end();
      cb();
    }
  });

  // Fan-out (text) to files
  const fanOut = makeFanOut([wsAll, wsFiltered]);

  // Wire the text branches into a single tee (fanOut)
  toAll.pipe(fanOut, { end: false });
  filterHigh.pipe(toFiltered).pipe(fanOut, { end: false });

  // Close fanOut when both branches finish
  let branchesEnded = 0;
  function branchDone() {
    branchesEnded++;
    if (branchesEnded === 2) fanOut.end();
  }
  toAll.on("end", branchDone);
  toFiltered.on("end", branchDone);

  // Collect stats at the end
  let finalStats = null;
  stats.on("stats", (s) => { finalStats = s; });

  try {
    await pipeline(
      rs,
      splitter,
      parser,
      stats,
      dispatcher,
      { signal }
    );

    if (finalStats) {
      await fsp.writeFile(outStats, JSON.stringify(finalStats, null, 2));
    }
  } finally {
    clearTimeout?.(timeout);
  }
}

async function main() {
  console.log("=== ADVANCED STREAMS DEMONSTRATION ===");
  await ensureDirs();

  console.time("Generate NDJSON");
  await generateNDJSON(ndjson, { rows: 150_000 }); // adjust size as needed
  console.timeEnd("Generate NDJSON");

  try {
    console.time("Process NDJSON");
    await processNDJSON({ abortMs: ABORT_MS });
    console.timeEnd("Process NDJSON");
    console.log("Done. Outputs:", {
      outAll,
      outFiltered,
      outStats
    });
  } catch (err) {
    if (err.name === "AbortError" || /aborted/i.test(String(err))) {
      console.error("Pipeline aborted:", err.message || err);
    } else {
      console.error("Pipeline failed:", err);
    }
    process.exitCode = 1;
  }

  // Notes:
  // - Abort with ABORT_MS to verify cleanup paths. Partial outputs may exist.
  // - lineSplitter + ndjsonParser enable true streaming JSON processing.
  // - dispatcher demonstrates manual backpressure-aware branching to two text pipelines.
  // - For more branches, consider libraries or structured broadcast pipelines.
  // - Always close/end all writable streams on completion or abort.
}

main();