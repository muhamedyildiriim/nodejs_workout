# Database Access: Mongoose ODM (NoSQL)

**Goal:** Provide a "Masterclass" on the **end-to-end engineering** of a Document-Based Data Access Layer using Mongoose.

This section answers the "Architect's" question: **"How do you enforce structure, business logic, and data integrity on a schema-less database like MongoDB?"**

It is built on the principle of **"Application-Level Schema Enforcement"**, ensuring that while the database is flexible, the code remains strict and predictable.

---

## Structure

1.  **`Employee.model.js`**
    * **Concept:** The "Smart" Model (Single Source of Truth).
    * **Focus:** It encapsulates the entire business identity of an employee:
        * **Schema Definition:** Strict types, enums (Department), and validation rules.
        * **Virtuals:** Computed properties (e.g., `fullName`) that exist in memory but not in the DB.
        * **Middleware (Hooks):** Auto-executing logic (Async Pre-Save) to handle audit logging.
        * **Methods:** Custom business actions like `giveRaise()`.

2.  **`01-connection-manager.js`**
    * **Concept:** Infrastructure & Resilience.
    * **Focus:** Implements the **Singleton Pattern** to manage the stateful MongoDB connection. It prevents "Too Many Connections" errors and handles connection pooling efficiently.

3.  **`02-schema-hooks.js`**
    * **Concept:** The Life Cycle Demo.
    * **Focus:** Demonstrates the data journey: Instantiation -> Pre-Save Hook Execution -> Persistence -> Virtual Access -> Method Execution.

4.  **`03-advanced-operations.js`**
    * **Concept:** Performance Optimization.
    * **Focus:** Compares the "Heavy" Mongoose Document (Active Record) against the "Lightweight" **`.lean()`** query (POJO). Essential knowledge for high-traffic APIs.

---

## Key Takeaways

* **Guard the Door:** MongoDB accepts anything. Mongoose is the bouncer that enforces rules before data enters.
* **Logic in Models:** Don't bloat your Controllers. Put logic like validation, defaults, and triggers inside the Schema.
* **Performance Awareness:** Mongoose objects are "heavy" (contain change tracking). For read-only APIs, always use `.lean()` to return plain JSON.
* **Modern Async:** We use modern `async/await` in hooks, abandoning the old `next()` callback style to avoid "Callback Hell".

---

## How to Run

Ensure you have a MongoDB instance running (Docker or Local) before executing these scripts.

### 0. Prerequisites
If using Docker (Recommended):
```bash
docker run -d -p 27017:27017 --name my-mongo mongo:latest
```

### 1. Run the Lifecycle Demo (Hooks & Virtuals)
Observe how the Employee model automatically handles logic during save operations.
```bash
node src/03-api-architectures/04-database-access/mongoose/02-schema-hooks.js
```

### 2. Run Performance Test
Compare the execution speed and memory footprint of Heavy vs. Lean queries.
```bash
node src/03-api-architectures/04-database-access/mongoose/03-advanced-operations.js
```

### 3. Run CRUD Operations (Optional)
If you created the full CRUD file, run it to see Create, Read, Update, Delete flows.
```bash
node src/03-api-architectures/04-database-access/mongoose
```