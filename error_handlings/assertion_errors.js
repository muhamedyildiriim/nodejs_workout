// ===========================================
// = ASSERTION ERROR (Condition Didn’t Hold) =
// ===========================================

// During tests or checks, if “this must be true” is false.
import assert from "assert";
try {
  assert.strictEqual(2 + 2, 5, "Matematik yanlış!");
} catch (err) {
  console.log("Assertion Error:", err.message);
}
// Use to verify that code behaves as expected.