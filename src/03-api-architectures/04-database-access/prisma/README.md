# Database Access: Prisma ORM (SQL)

**Goal:** Provide a "Masterclass" on the **end-to-end engineering** of a Type-Safe SQL Data Access Layer.

This section answers the "Architect's" question: **"How do you manage relational data, ensure ACID compliance, and maintain strict type safety in a Node.js environment?"**

It is built on the principle of **"Schema-First Design"**, ensuring that your database structure dictates your code's behavior, not the other way around.

---

## Structure

1.  **`schema.prisma`**
    * **Concept:** The Source of Truth (The Map).
    * **Focus:** Defines the database models (`User`, `Post`), their relationships (One-to-Many), and the underlying datasource configuration (SQLite).

2.  **`01-prisma-client.js`**
    * **Concept:** Infrastructure & Connection Management.
    * **Focus:** Implements the **Singleton Pattern** to prevent database connection exhaustion during development (Hot-Reload issues). It also enables query logging for debugging.

3.  **`02-relational-crud.js`**
    * **Concept:** Business Logic Implementation.
    * **Focus:** Demonstrates the power of the ORM:
        * **Nested Writes:** Creating parent and child records in a single instruction.
        * **Transactions:** Using `$transaction` to ensure data integrity (Atomicity).
        * **Joins:** Using `include` to fetch related data efficiently.
        * **Aggregations:** Performing statistical calculations on the DB side.

---

## Key Takeaways

* **Type Safety is King:** Prisma generates a custom client based on your schema. If you try to access a field that doesn't exist, the code won't even compile (or run).
* **Relational Integrity:** Unlike NoSQL, we enforce strict relationships. You cannot create a `Post` without a valid `User`.
* **Nested Operations:** Reduce round-trips to the database by performing inserts and updates on related tables in a single function call.
* **Modular Architecture:** Keeping `schema.prisma` inside the module (instead of root) requires specific CLI flags (`--schema`), simulating a microservices structure.

---

## How to Run

Follow these commands strictly to initialize the environment and execute the demo.

### 1. Installation
Ensure dependencies are installed and locked to the stable version.
```bash
npm install
```

### 2. Database Migration (Required)
Generate the SQLite database (dev.db) and the Type-Safe Client. Note: We use the --schema flag because our schema file is nested deeply, not in the project root.

```bash
npx prisma migrate dev --name init --schema=./src/03-api-architectures/04-database-access/prisma/schema.prisma
```

### 3. Run the Demo
Execute the relational CRUD operations script.

```bash
node src/03-api-architectures/04-database-access/prisma/02-relational-crud.js
```