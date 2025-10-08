/*
These occur later (not instantly) — for example, during network requests, file reads, or timers.

Common Causes:

- Failed fetch() requests
- File not found (fs.readFile)
- Timeout or network errors
*/


// ============================================
// ========== ASYNC ERROR (Promise) ===========
// ============================================

// Some operations don’t finish immediately — e.g., file read, API call.
// These return a Promise.
// .then() = success path
// .catch() = error path
fetch('https://api.sahteurl.com')
  .then(res => res.json())
  .then(data => console.log("Veri:", data))
  .catch(err => console.log("Hata:", err.message));
// If there is no .catch() → the error isn’t caught and you’ll see
// “Unhandled Promise Rejection” in the terminal.
/*
  How to handle:
    Use .catch() after Promise chains
    Or use try...catch inside an async function
*/


// ============================================
// ========= ASYNC ERROR (async/await) ========
// ============================================

// Modern approach.
// You write code as if synchronous, but catch errors with try/catch.
async function getData() {
  try {
    const res = await fetch('https://api.sahteurl.com');
    const data = await res.json();
    console.log("Veri:", data);
  } catch (err) {
    console.log("Bir hata oluştu:", err.message);
  }
}
getData();
// await waits for the result.
// If an error occurs, control falls into catch.
// When it appears: During callback / Promise / async operations