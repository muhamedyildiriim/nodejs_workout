// ============================================
// ==== SYSTEM ERROR (File, Network, etc.) ====
// ============================================

// If an operation related to the system fails, that’s a System Error.
import fs from "fs/promises";
try {
  await fs.readFile("olmayan_dosya.txt", "utf8");
} catch (err) {
  console.log("System Error:", err.code); // ENOENT
}
// Modules like fs or net receive errors from the OS → check err.code (e.g., ENOENT).