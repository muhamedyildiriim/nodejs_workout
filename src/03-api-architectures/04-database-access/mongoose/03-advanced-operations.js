/**
 * File: /03-api-architectures/04-database-access/mongoose/03-advanced-operations.js
 * Topic: Performance → Query Optimization (.lean vs Heavy Models)
 * Purpose: Compares the overhead of full Mongoose Documents vs. Plain JS Objects.
 * Critical for high-traffic endpoints (e.g., GET /products).
 *
 * Key Points:
 * - **The Heavy Way:** `findOne()` returns a complex Mongoose Document (good for updates).
 * - **The Lean Way:** `.lean()` returns a simple JSON object (good for reads).
 * - **Projection:** `.select()` fetches only necessary fields to save bandwidth.
 * - **Upsert:** Updates if exists, Creates if not (Atomic operation).
 *
 * Run: node src/03-api-architectures/04-database-access/mongoose/03-advanced-operations.js
 * Expected:
 * - Compares execution times (console.time).
 * - Shows the difference in object types (Model vs Object).
 */

import mongoose from "mongoose";
import { connectToMongo } from "./01-connection-manager.js";
import Employee from "./Employee.model.js";

async function runPerformanceDemo() {
  console.log("--- ⚡️ Mongoose Performance Optimization ---");

  try {
    await connectToMongo();

    // 1. Seed Data (Upsert Pattern)
    const seedEmail = "perf_test@usa.com";
    await Employee.updateOne(
      { email: seedEmail },
      { 
        firstName: "Perf", 
        lastName: "Tester", 
        department: "Sales", 
        salary: 60000 
      },
      { upsert: true }
    );

    // --- SCENARIO A: Heavy Query (Active Record) ---
    // Use when you need to call .save(), .validate(), or use virtuals later.
    console.time("🐢 Heavy Query (Full Document)");
    const heavyDoc = await Employee.findOne({ email: seedEmail });
    console.timeEnd("🐢 Heavy Query (Full Document)");
    
    // --- SCENARIO B: Lean Query (POJO) ---
    // Use for Read-Only APIs. Much lighter on RAM and CPU.
    console.time("🐇 Lean Query (Plain JSON)");
    const leanDoc = await Employee.findOne({ email: seedEmail })
      .select("firstName email salary") // Optimization: Field Selection
      .lean(); // Optimization: Plain Object
    console.timeEnd("🐇 Lean Query (Plain JSON)");

    // --- Verification ---
    console.log("\n--- Object Analysis ---");
    console.log(`Heavy Doc Type: ${heavyDoc.constructor.name} (Contains internal state)`);
    console.log(`Lean Doc Type:  ${leanDoc.constructor.name} (Pure Data)`);

  } catch (error) {
    console.error("Execution Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

runPerformanceDemo();