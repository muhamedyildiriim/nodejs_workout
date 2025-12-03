/**
 * File: /03-api-architectures/04-database-access/prisma/01-prisma-client.js
 * Topic: Infrastructure → Database Connection (Singleton Pattern)
 * Purpose: Establishes a Type-Safe connection to the SQL database using Prisma.
 *
 * Key Points:
 * - **The Singleton Problem:** In Node.js development (especially with hot-reload),
 * creating a new PrismaClient on every file change exhausts database connections.
 * We attach the instance to the `global` object to reuse it.
 * - **Logging:** Enables query logging to see the raw SQL being executed.
 *
 * Usage: Import `prisma` from this file instead of `new PrismaClient()`.
 */

import { PrismaClient } from "@prisma/client";

// Prevent multiple instances in development (Best Practice for Next.js/Node)
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Visualize the SQL magic
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;