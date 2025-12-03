/**
 * File: /03-api-architectures/04-database-access/mongoose/01-connection-manager.js
 * Topic: Infrastructure → Database Connection Management
 * Purpose: Establishes a robust, persistent connection to MongoDB using best practices
 * for error handling and connection pooling.
 *
 * Key Points:
 * - **Singleton Connection:** Checks `readyState` to avoid redundant connections.
 * - **Resilience:** Sets timeouts to fail fast if the DB is unreachable (e.g., Docker down).
 * - **Strict Query:** Enables strict mode for Mongoose v7+ compatibility.
 * - **Environment Variables:** Prepared for `process.env.MONGO_URI` usage.
 *
 * Run: Imported by execution files.
 */

import mongoose from "mongoose";

let isConnected = false;

export const connectToMongo = async () => {
  // 1. Check existing connection (Optimization)
  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }

  const MONGO_URI = "mongodb://127.0.0.1:27017/architect_db";

  try {
    // 2. Configuration for Modern Mongoose
    mongoose.set("strictQuery", true);

    console.log("⏳ [System] Connecting to MongoDB...");
    const db = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s if DB is dead
      maxPoolSize: 10, // Maintain up to 10 concurrent sockets
    });

    isConnected = !!db.connections[0].readyState;
    console.log(`✅ [System] Connected successfully to host: ${db.connection.host}`);

  } catch (error) {
    console.error("❌ [System] Critical Database Error:", error.message);
    // Exit process in containerized envs to trigger restart
    process.exit(1);
  }
};