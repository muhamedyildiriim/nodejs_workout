// File: src/async-programming/12-realworld/api-concurrency-demo/services.js
// Purpose: Simulated async services to demonstrate parallel requests with Promise.all

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getUser(id = 1) {
  await wait(120); // simulate latency
  return { id, name: "Mami", plan: "pro" };
}

export async function getPermissions(id = 1) {
  await wait(180);
  return { id, roles: ["reader", "editor"], features: ["streams", "workers"] };
}

export async function getRecentActivity(id = 1) {
  await wait(150);
  return [
    { type: "login", at: Date.now() - 5000 },
    { type: "view", at: Date.now() - 3000 },
  ];
}