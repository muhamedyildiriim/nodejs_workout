/**
 * File: /04-advanced-patterns-and-scaling/05-caching-with-redis/02-cache-aside-pattern.js
 * Topic: Advanced Patterns -> Caching -> The "Cache-Aside" Pattern
 * Purpose: Demonstrates the standard architectural pattern for caching.
 *
 * The Architecture:
 * 1. Check Cache (Redis) first.
 * 2. If HIT: Return data immediately (Fast).
 * 3. If MISS: Fetch from Database (Slow), save to Cache, return data.
 *
 * Run: node src/04-advanced-patterns-and-scaling/05-caching-with-redis/02-cache-aside-pattern.js
 */

import { createClient } from "redis";

// --- Mock Database (Slow) ---
const db = {
  getUser: async (id) => {
    return new Promise((resolve) => {
      console.log(`   [Database] Querying for user ${id}... (Slow)`);
      setTimeout(() => {
        resolve({ id, name: "Architect User", role: "Admin" });
      }, 1000); // Simulate 1s latency
    });
  },
};

async function runCacheAsideDemo() {
  const client = createClient();
  await client.connect();
  
  // The "Cache-Aside" Implementation
  const getUserProfile = async (userId) => {
    const cacheKey = `user:${userId}`;

    // 1. Check Cache
    const cachedData = await client.get(cacheKey);

    if (cachedData) {
      console.log("   [Redis] Cache HIT! Returning data instantly.");
      return JSON.parse(cachedData);
    }

    // 2. If Miss, Check DB
    console.log("   [Redis] Cache MISS.");
    const user = await db.getUser(userId);

    // 3. Update Cache (with Expiration)
    // We store it for 60 seconds to ensure freshness.
    await client.set(cacheKey, JSON.stringify(user), { EX: 60 });
    
    return user;
  };

  console.log("--- Request 1: Cold Start (Cache Miss) ---");
  console.time("Req 1 Time");
  await getUserProfile(101);
  console.timeEnd("Req 1 Time"); // ~1000ms

  console.log("\n--- Request 2: Hot Cache (Cache Hit) ---");
  console.time("Req 2 Time");
  await getUserProfile(101);
  console.timeEnd("Req 2 Time"); // ~1ms

  await client.disconnect();
}

runCacheAsideDemo();