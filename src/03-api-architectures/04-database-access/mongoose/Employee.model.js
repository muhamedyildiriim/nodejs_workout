/**
 * File: /03-api-architectures/04-database-access/mongoose/Employee.model.js
 * Topic: Data Access → Schema Definition (Single Source of Truth)
 * Purpose: Defines the shape, validation, and business rules of the "Employee" entity.
 * Serves as the central module to prevent circular dependency errors.
 *
 * Key Points:
 * - **Schema Definition:** Explicit types and validation rules (Trim, Enum, Min).
 * - **Modern Middleware:** Uses Async/Await hooks (No more callbacks like `next`).
 * - **Virtuals:** Computed properties that exist in app logic but not in DB storage.
 * - **Singleton Pattern:** Prevents model re-compilation errors in serverless/dev envs.
 *
 * Usage: Imported by other files (Repository, Controllers, Demos).
 */

import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    department: { 
      type: String, 
      enum: ["Engineering", "HR", "Sales"],
      index: true // Optimized for filtering
    },
    salary: { type: Number, min: 3000 },
    logs: { type: [String], default: [] },
  },
  {
    timestamps: true, // Auto-manage createdAt & updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// --- Business Logic: Virtuals ---
employeeSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// --- Business Logic: Middleware (Pre-Save) ---
// Note: In Mongoose v8, we use async functions. No 'next()' needed.
employeeSchema.pre("save", async function () {
  console.log(`🔒 [Audit] Executing pre-save check for: ${this.email}`);
  
  // Example Logic: Log salary changes
  if (this.isModified("salary")) {
    this.logs.push(`Salary updated at ${new Date().toISOString()}`);
  }
});

// --- Business Logic: Methods ---
employeeSchema.statics.findEngineers = function () {
  return this.find({ department: "Engineering" }).lean();
};

employeeSchema.methods.giveRaise = async function (amount) {
  this.salary += amount;
  return this.save();
};

// Exporting as a Singleton to avoid "OverwriteModelError"
const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;