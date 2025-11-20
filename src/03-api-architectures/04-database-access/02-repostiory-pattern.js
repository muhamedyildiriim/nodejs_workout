/**
 * File: /03-api-architectures/04-database-access/02-repository-pattern.js
 * Topic: Data Access → The Repository Pattern (Architecture)
 * Purpose: Demonstrates how to decouple the business logic
 * from the actual database implementation (SQL vs NoSQL).
 *
 * Key Points:
 * - **The Problem:** If you write `db.query('SELECT * FROM users')` directly in your
 * controllers, you are tightly coupled to SQL. Switching to MongoDB later is impossible.
 * - **The Solution (Repository Pattern):** Create an interface (class) that defines
 * *what* data operations are allowed (e.g., `findUser`, `createUser`),
 * hiding *how* they are done.
 * - **Dependency Injection:** The service receives the repository as a dependency.
 *
 * Run: node src/03-api-architectures/04-database-access/02-repository-pattern.js
 */

// --- 1. The "Contract" (What we need to do) ---
// In TypeScript, this would be an `interface`. In JS, we use a base class.
class UserRepository {
  async findById(id) { throw new Error("Not implemented"); }
  async create(user) { throw new Error("Not implemented"); }
}

// --- 2. Implementation A: In-Memory (For Testing) ---
// This simulates a database using a simple JavaScript Array.
class InMemoryUserRepo extends UserRepository {
  constructor() {
    super();
    this.db = new Map(); // The "Database"
  }

  async findById(id) {
    console.log(`[InMemoryRepo] Searching for user ${id}...`);
    return this.db.get(id) || null;
  }

  async create(user) {
    console.log(`[InMemoryRepo] Saving user ${user.username}...`);
    const id = Math.floor(Math.random() * 1000);
    const newUser = { ...user, id };
    this.db.set(id, newUser);
    return newUser;
  }
}

// --- 3. Implementation B: Mock SQL (Simulating Postgres) ---
class MockSqlUserRepo extends UserRepository {
  async findById(id) {
    console.log(`[SQLRepo] SELECT * FROM users WHERE id = ${id};`);
    // Simulate SQL return
    return { id, username: "sql_user" };
  }

  async create(user) {
    console.log(`[SQLRepo] INSERT INTO users (username) VALUES ('${user.username}');`);
    return { ...user, id: 999 };
  }
}

// --- 4. The "Service Layer" (Business Logic) ---
// Notice: The Service DOES NOT KNOW which database is being used.
// It just uses the "repo" object passed to it.
class UserService {
  constructor(userRepository) {
    this.repo = userRepository;
  }

  async registerUser(username) {
    // Business Logic here (e.g., check if username allowed)
    const user = await this.repo.create({ username });
    console.log("Service: User registered:", user);
  }
}

// --- 5. The Switch ---
(async () => {
  console.log("--- Scenario 1: Using In-Memory Database ---");
  const memoryRepo = new InMemoryUserRepo();
  const serviceA = new UserService(memoryRepo); // Inject Memory Repo
  await serviceA.registerUser("alice");

  console.log("\n--- Scenario 2: Switching to SQL Database (No Service Code Change!) ---");
  const sqlRepo = new MockSqlUserRepo();
  const serviceB = new UserService(sqlRepo); // Inject SQL Repo
  await serviceB.registerUser("bob");
})();