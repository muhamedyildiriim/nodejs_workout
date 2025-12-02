/**
 * File: /04-advanced-patterns-and-scaling/05-caching-with-redis/01-redis-basics.js
 * Topic: Advanced Patterns -> Caching -> Redis Basics
 * Purpose: Demonstrates how to connect to a Redis server and perform basic
 * operations (SET, GET, DELETE) using the modern `redis` client.
 *
 * Key Points:
 * - **Redis:** An in-memory data structure store.
 * - **Client:** Uses the `redis` npm package.
 * - **SET/GET:** The fundamental commands for caching strings.
 * - **EXPIRE (TTL):** Keys self-destruct after a set time.
 *
 * Prerequisite: Ensure a Redis server is running on localhost:6379
 * Run: node src/04-advanced-patterns-and-scaling/05-caching-with-redis/01-redis-basics.js
 */

import { createClient } from "redis";

async function runRedisDemo() {
  console.log("--- Starting Redis Basics Demo ---");

  // 1. Create the Client
  // Defaults to redis://localhost:6379
  const client = createClient();

  client.on("error", (err) => console.error("Redis Client Error", err));

  try {
    // 2. Connect
    await client.connect();
    console.log("1. Connected to Redis successfully.");

    // 3. SET a value
    await client.set("demo_key", "Hello from Node.js!");
    console.log("2. SET 'demo_key' -> 'Hello from Node.js!'");

    // 4. GET a value
    const value = await client.get("demo_key");
    console.log(`3. GET 'demo_key' -> "${value}"`);

    // 5. SET with Expiration (TTL)
    // This key will vanish after 10 seconds.
    await client.set("temp_key", "I will vanish", {
      EX: 10, 
    });
    console.log("4. SET 'temp_key' with 10s expiration.");

  } catch (err) {
    console.error("Demo failed:", err);
  } finally {
    // 6. Disconnect
    await client.disconnect();
    console.log("5. Disconnected.");
  }
}

runRedisDemo();