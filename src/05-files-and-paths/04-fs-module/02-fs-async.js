/**
 * Topic: Node.js Core → fs (Promises, Async/Await)
 * Purpose: Demonstrate safe, production-ready file operations using fs/promises with async/await.
 * Key Points:
 *  - Use `fs/promises` for non-blocking I/O in servers/CLIs.
 *  - Always combine with `path` and absolute bases (__dirname or process.cwd()).
 *  - Guard reads/writes: ensure directories, handle ENOENT/EEXIST, and close resources.
 * Run: node src/05-files-and-paths/04-fs-module/02-fs-async.js
 * Expected:
 *  - Creates a data directory
 *  - Writes, reads, appends, renames, copies, lists and deletes files asynchronously
 *  - Shows JSON read/write and parallel reads with Promise.all
 */

import { promises as fs } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Recreate __filename / __dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ---------- Helpers ----------
async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function safeWrite(filePath, data, { overwrite = true } = {}) {
  // overwrite=false → fail if exists
  const flag = overwrite ? "w" : "wx";
  await fs.writeFile(filePath, data, { flag });
}

async function readText(filePath) {
  return fs.readFile(filePath, "utf-8");
}

async function readJson(filePath) {
  const txt = await readText(filePath);
  try {
    return JSON.parse(txt);
  } catch (e) {
    throw new Error(`Invalid JSON in ${filePath}: ${e.message}`);
  }
}

async function writeJson(filePath, obj, options = {}) {
  const pretty = JSON.stringify(obj, null, 2);
  await safeWrite(filePath, pretty, options);
}

function logSection(title) {
  console.log(`\n--- ${title} ---`);
}

(async () => {
  console.log("=== FS PROMISES DEMONSTRATION ===");

  // Base paths
  const dataDir = path.join(__dirname, "data");
  const outDir = path.join(__dirname, "output");

  const fileA = path.join(dataDir, "a.txt");
  const fileB = path.join(dataDir, "b.txt");
  const fileRenamed = path.join(dataDir, "a-renamed.txt");
  const fileCopy = path.join(dataDir, "a-copy.txt");

  const configJson = path.join(dataDir, "config.json");
  const resultLog = path.join(outDir, "result.log");

  // 1) Ensure directories
  logSection("Ensure directories");
  await ensureDir(dataDir);
  await ensureDir(outDir);

  // 2) Write files (non-blocking)
  logSection("Write files");
  await safeWrite(fileA, "Hello from file A\n");
  await safeWrite(fileB, "Hello from file B\n");

  // 3) Append content
  logSection("Append content");
  await fs.appendFile(fileA, "Appended line A\n");

  // 4) Read files (await)
  logSection("Read files");
  const aContent = await readText(fileA);
  console.log("a.txt:", JSON.stringify(aContent));

  // 5) Parallel reads (Promise.all)
  logSection("Parallel reads");
  const [aText, bText] = await Promise.all([readText(fileA), readText(fileB)]);
  console.log("a.txt length:", aText.length, "b.txt length:", bText.length);

  // 6) Rename and copy
  logSection("Rename and copy");
  await fs.rename(fileA, fileRenamed);
  await fs.copyFile(fileRenamed, fileCopy);
  console.log("Renamed to:", path.basename(fileRenamed));
  console.log("Copied to:", path.basename(fileCopy));

  // 7) Stat and list directory
  logSection("Stat and readdir");
  const statCopy = await fs.stat(fileCopy);
  console.log("copy.txt size:", statCopy.size, "bytes");
  const listing = await fs.readdir(dataDir);
  console.log("data/ listing:", listing);

  // 8) JSON read/write with guards
  logSection("JSON read/write");
  const defaultConfig = { env: "dev", retries: 3, features: { logs: true } };
  // Write only once if not exists
  try {
    await writeJson(configJson, defaultConfig, { overwrite: false });
    console.log("config.json created");
  } catch (e) {
    if (e.code === "EEXIST") {
      console.log("config.json already exists");
    } else {
      throw e;
    }
  }

  // Update JSON safely
  const config = await readJson(configJson);
  config.retries += 1;
  config.features.logs = Boolean(config.features?.logs);
  await writeJson(configJson, config, { overwrite: true });
  console.log("config.json updated:", config);

  // 9) Write result log with timestamps
  logSection("Write result log");
  const timestamp = new Date().toISOString();
  await fs.appendFile(resultLog, `[${timestamp}] Completed operations\n`);
  console.log("result.log appended");

  // 10) Cleanup demo artifacts
  logSection("Cleanup");
  // Prefer unlink for files; rm({ force:true }) for robust cleanup
  await fs.unlink(fileCopy).catch(() => {});
  await fs.unlink(fileB).catch(() => {});
  await fs.unlink(fileRenamed).catch(() => {});
  // Keep dataDir/config.json as a persistent artifact
  console.log("Cleanup done (kept config.json).");

  // Notes:
  // - Prefer fs/promises over sync APIs for servers and long-running tools.
  // - Use __dirname (module-local) for assets shipped with code.
  // - Use process.cwd() when operating relative to where CLI is invoked.
  // - Guard writes with flags (wx) to avoid accidental overwrite.
  // - Use Promise.all for independent reads/writes to improve throughput.
})().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});