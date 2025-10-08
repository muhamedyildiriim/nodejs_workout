// ============================================
// = UNCAUGHT EXCEPTION (Not Caught Anywhere) =
// ============================================

// An error that didn’t hit any try/catch.
// The program would crash, but you can catch it at the last moment.
// Unexpected crash-level errors that aren’t handled by try...catch.
process.on("uncaughtException", (err) => {
  console.log("Son anda yakalandı:", err.message);
  process.exit(1);
});
throw new Error("Bu hata yakalanmadı!");
// This pattern is only for “log and shut down”.
// Not for normal error handling.
/*
How to handle:

- Log the error
- Gracefully shut down the process
- Don’t continue running in a broken state
*/