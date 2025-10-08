// ============================================
// =========== UNHANDLED EXCEPTION ============
// ============================================

// If you forget to .catch() or wrap await in try...catch, Node.js will warn or crash.

// No catch
Promise.reject("Oops!");

// Global handler (for last-resort)
process.on('unhandledRejection', (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

// How to handle: Always attach .catch() or wrap in try...catch.