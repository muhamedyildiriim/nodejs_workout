// ============================================
// ===== JavaScript Built-in Error Types ======
// ============================================


//TypeError
// When: Using a value in the wrong way.
const num = 5;
// num() // TypeError: num is not a function
// Fix: Check types; add guards or TypeScript/JSDoc.


//ReferenceError
// When: Variable doesn’t exist in scope.
// console.log(a) // ReferenceError: a is not defined
// Fix: Declare before use; lint with ESLint no-undef.


//SyntaxError
// When: Invalid syntax (often at load/parse time).
// const x = ; // SyntaxError
// Fix: Fix syntax; use editor/formatter/ESLint.


//RangeError
// When: Value outside allowable range.
function repeat(s, n) {
  return s.repeat(n); // RangeError if n is huge or negative
}
// Fix: Validate n bounds.


//URIError
// When: Bad URI component.
// decodeURIComponent("%") // URIError
// Fix: Validate/encode before decoding.


//EvalError (rare)
// When: eval misuse (almost never in modern code).
// Fix: Avoid eval.


//AggregateError
// When: Multiple errors grouped (e.g., Promise.any rejections).
const p = Promise.any([
  Promise.reject(new Error("A")),
  Promise.reject(new Error("B")),
]);
p.catch((err) => {
  if (err instanceof AggregateError) {
    for (const e of err.errors) console.error("One error:", e.message);
  }
});
// Fix: Iterate err.errors and handle individually.