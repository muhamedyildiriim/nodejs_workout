/**
 * File: /03-api-architectures/04-database-access/mongoose/02-schema-hooks.js
 * Topic: Data Access → Middleware & Business Logic Execution
 * Purpose: Demonstrates the "Life Cycle" of a data entity. Shows how business rules
 * (Hooks, Virtuals) are applied automatically by the ODM.
 *
 * Key Points:
 * - **Async Hooks:** Using modern async/await in pre-save hooks (No callbacks).
 * - **Virtual Fields:** Accessing computed data (`fullName`) seamlessly.
 * - **Instance Methods:** Encapsulating logic (`giveRaise`) within the document.
 * - **Clean Slate:** Auto-cleaning old test data before running.
 *
 * Run: node src/03-api-architectures/04-database-access/mongoose/02-schema-hooks.js
 * Expected:
 * - Logs the pre-save audit message.
 * - Logs the virtual fullName.
 * - Logs the updated salary after the instance method runs.
 */

import mongoose from "mongoose";
import { connectToMongo } from "./01-connection-manager.js";
import Employee from "./Employee.model.js";

async function runSchemaDemo() {
  console.log("--- 🚀 Mongoose Life Cycle Demo ---");

  try {
    await connectToMongo();

    // 1. Setup: Clean previous test data
    await Employee.deleteMany({ email: "modern_dev@usa.com" });

    // 2. Initialization
    const dev = new Employee({
      firstName: "Modern",
      lastName: "Architect",
      email: "modern_dev@usa.com",
      department: "Engineering",
      salary: 120000,
    });

    // 3. Persistence (Triggers 'pre-save' hook)
    console.log("\n1. Saving Document...");
    await dev.save();
    console.log("   ✅ Document persisted to database.");

    // 4. Virtuals Access
    console.log("\n2. accessing Virtual Property...");
    console.log(`   Name: ${dev.fullName}`); // Computed on the fly

    // 5. Business Logic Execution
    console.log("\n3. Executing Instance Method...");
    await dev.giveRaise(15000);
    console.log(`   💰 New Salary Applied: $${dev.salary}`);

  } catch (error) {
    console.error("🔥 Execution Error:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("\n--- Demo Completed ---");
  }
}

runSchemaDemo();