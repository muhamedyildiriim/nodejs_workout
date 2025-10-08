// ============================================
// =============== DOMAIN ERROR ===============
// ============================================

// Isolating errors inside domains

import domain from 'domain';
const d = domain.create();

d.on("error", (err) => {
  console.error("Domain caught:", err.message);
});

d.run(() => {
  throw new Error("Error inside domain!");
});

// The domain module used to catch asynchronous errors in a specific context.
// It’s deprecated — prefer try/catch, Promise, and async_hooks.