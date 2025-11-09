/**
 * File: /02-project-infrastructure/02-globals-and-buffers/03-buffer-basics.js
 * Topic: Project Infrastructure → Globals → `Buffer`
 * Purpose: Demonstrates the `Buffer` object, Node.js's "Architect"
 * "Tool" for handling "raw binary data".
 *
 * Key Points:
 * - `Buffer` is a `global` "Tool". No `import` needed.
 * - JavaScript `string`s are for "text" (UTF-8).
 * - `Buffer`s are for "binary data" (images, video,
 * TCP packets, file chunks from `fs.createReadStream`).
 * - `Buffer.from('text')`: Creates a Buffer from a string (UTF-8).
 * - `buf.toString('utf8')`: Converts a Buffer *back* to a string.
 *
 * Run: node src/02-project-infrastructure/02-globals-and-buffers/03-buffer-basics.js
 * Expected:
 * - Logs the raw <Buffer ...> data.
 * - Logs the decoded "Hello" string.
 * - Logs the "base64" (used for images) encoding.
 */

// 1. Create a Buffer from a string (Text -> Binary)
// This is what `fs.writeFile` does "under the hood".
const buf = Buffer.from("Hello, World!", "utf8");

console.log("1. The raw Buffer (Binary Data):");
console.log(buf);
// Output: <Buffer 48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21>
// (These are the "hex codes" for the ASCII characters)

// 2. Convert a Buffer *back* to a string (Binary -> Text)
// This is what `fs.readFile(..., 'utf8')` does.
const text = buf.toString("utf8");
console.log("\n2. The decoded string (toString('utf8')):");
console.log(text); // Output: Hello, World!

// 3. The "Real-World" Use Case: Encodings
// Buffers are the "Architect" "Tool" for
// converting between data encodings.
const base64data = buf.toString("base64");
console.log("\n3. The Buffer in 'base64' encoding (e.g., for images):");
console.log(base64data); // Output: SGVsbG8sIFdvcmxkIQ==

// 4. Converting back from Base64
const bufFromBase64 = Buffer.from(base64data, "base64");
console.log("\n4. Decoded from 'base64':");
console.log(bufFromBase64.toString("utf8")); // Output: Hello, World!

// Notes:
// - You will *always* receive `Buffer`s when working with `fs.createReadStream` or `http` request/response "Streams".
// - `Buffer` is the "difference-making" "Tool" that allows Node.js (JavaScript) to work with low-level binary data.