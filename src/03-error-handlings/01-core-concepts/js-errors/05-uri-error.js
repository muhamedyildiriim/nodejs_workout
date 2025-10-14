/**
 * Topic: Error Handling → JS Errors → URIError
 * Purpose: Demonstrates URIError from malformed URI components.
 * Key Points:
 *  - decodeURIComponent() throws on invalid percent-encodings
 *  - Validate or encode data before decoding
 * Run: node src/03-error-handlings/01-core-concepts/js-errors/05-uri-error.js
 * Expected:
 *  - Logs: "URIError caught: URI malformed"
 */

try {
  decodeURIComponent("%"); // URIError
} catch (err) {
  console.error("URIError caught:", err.message);
}