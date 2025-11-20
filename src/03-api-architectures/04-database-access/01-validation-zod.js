/**
 * File: /03-api-architectures/04-database-access/01-validation-zod.js
 * Topic: Data Access → Validation (Data Integrity)
 * Purpose: Demonstrates the "Architect's" standard for validating data
 * *before* it ever reaches the database layer using `zod`.
 *
 * Key Points:
 * - **"Garbage In, Garbage Out":** Never trust user input.
 * - **Zod:** The modern, TypeScript-first schema validation library.
 * - **Schema Definition:** Define the "shape" and "rules" of your data.
 * - **Parse vs. SafeParse:** `parse` throws errors (good for middlewares),
 * `safeParse` returns an object (good for logic control).
 *
 * Run: node src/03-api-architectures/04-database-access/01-validation-zod.js
 * Expected:
 * - Logs successful validation object.
 * - Logs detailed validation error messages for invalid data.
 */

import { z } from "zod";

// --- 1. Define the Schema (The "Contract") ---
// This defines what a "User" *must* look like to enter our database.
const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 chars"),
  email: z.string().email("Invalid email format"),
  age: z.number().min(18, "User must be 18+").optional(), // Optional field
  role: z.enum(["admin", "user", "guest"]).default("user"),
  tags: z.array(z.string()).max(5), // Array of strings, max 5 items
});

async function runValidationDemo() {
  console.log("--- Zod Validation Demo ---");

  // --- Scenario A: Valid Data ---
  const validInput = {
    username: "architect_01",
    email: "test@example.com",
    age: 25,
    tags: ["nodejs", "architecture"],
  };

  console.log("\n1. Validating correct data...");
  const resultA = userSchema.safeParse(validInput);

  if (resultA.success) {
    console.log("Success! Sanitized Data:", resultA.data);
    // Note: 'role' was automatically added with default "user"
  } else {
    console.error("Failed!", resultA.error.format());
  }

  // --- Scenario B: Invalid Data ---
  const invalidInput = {
    username: "no", // Too short
    email: "not-an-email", // Invalid email
    role: "super-admin", // Not in enum
    tags: ["1", "2", "3", "4", "5", "6"], // Too many tags
    // 'age' is missing, but that's okay because it's optional
  };

  console.log("\n2. Validating invalid data...");
  const resultB = userSchema.safeParse(invalidInput);

  if (!resultB.success) {
    console.log("Validation Failed (Expected):");
    // Zod provides detailed, structured error messages
    const formattedErrors = resultB.error.format();
    console.log("Username Error:", formattedErrors.username?._errors);
    console.log("Email Error:", formattedErrors.email?._errors);
    console.log("Role Error:", formattedErrors.role?._errors);
  }
}

runValidationDemo();