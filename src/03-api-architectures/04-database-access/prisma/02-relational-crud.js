/**
 * File: /03-api-architectures/04-database-access/prisma/02-relational-crud.js
 * Topic: Data Access → Relational SQL Operations (ORM)
 * Purpose: Demonstrates the power of Prisma's "Fluent API" for handling complex
 * SQL relationships without writing raw SQL queries.
 *
 * Key Points:
 * - **Nested Writes:** Creating a Parent (User) and Children (Posts) in ONE instruction.
 * - **Transactions:** Ensuring all operations succeed or fail together (Atomicity).
 * - **Include (JOIN):** Fetching related data efficiently.
 * - **Aggregation:** Running statistical queries (Count, Avg, etc.).
 *
 * Run: node src/03-api-architectures/04-database-access/prisma/02-relational-crud.js
 */

import prisma from "./01-prisma-client.js";

async function runPrismaDemo() {
  console.log("--- Prisma ORM: Relational Operations ---");

  try {
    // --- 1. CLEANUP (Transactional Integrity) ---
    // We must delete dependent data (Posts) first, then the User.
    // $transaction guarantees these run together.
    console.log("1. Cleaning up old data...");
    await prisma.$transaction([
      prisma.post.deleteMany(),
      prisma.user.deleteMany({ where: { email: "architect@prisma.io" } })
    ]);


    // --- 2. CREATE (Nested Write) ---
    // Engineering Magic: Insert into 2 tables with 1 function call.
    console.log("\n2. [CREATE] User with Nested Posts...");
    
    const newUser = await prisma.user.create({
      data: {
        name: "SQL Architect",
        email: "architect@prisma.io",
        role: "ADMIN",
        // Here we create related 'Post' records instantly
        posts: {
          create: [
            { title: "Why Prisma Rocks", content: "Type-safety is key." },
            { title: "Node.js Architecture", published: true }
          ]
        }
      }
    });
    
    console.log(`User Created: ID ${newUser.id} (${newUser.email})`);


    // --- 3. READ (Relational Query / JOIN) ---
    // SQL Equivalent: SELECT * FROM User LEFT JOIN Post ON ...
    console.log("\n3. [READ] Fetching User AND Posts (Include)...");
    
    const userWithPosts = await prisma.user.findUnique({
      where: { email: "architect@prisma.io" },
      include: {
        posts: true // This performs the JOIN
      }
    });

    console.log(`User: ${userWithPosts.name}`);
    console.log(`Posts Found: ${userWithPosts.posts.length}`);
    // console.dir(userWithPosts, { depth: null }); // Uncomment for full object dump


    // --- 4. UPDATE (Modify Data) ---
    console.log("\n4. [UPDATE] Publishing a Post...");
    
    // Grab the ID of the first unpublished post
    const draftPost = userWithPosts.posts.find(p => !p.published);
    
    if (draftPost) {
      const updatedPost = await prisma.post.update({
        where: { id: draftPost.id },
        data: { published: true }
      });
      console.log(`Post ID ${updatedPost.id} is now Published.`);
    }


    // --- 5. AGGREGATION (Statistics) ---
    console.log("\n5. [STATS] Database Analytics...");
    
    const stats = await prisma.post.aggregate({
      _count: { id: true },
      where: { published: true }
    });
    
    console.log(`Total Published Posts in System: ${stats._count.id}`);

  } catch (error) {
    console.error("Runtime Error:", error);
  } finally {
    await prisma.$disconnect();
    console.log("\n--- Demo Completed ---");
  }
}

runPrismaDemo();