import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Always reuse a single client per process — every PrismaClient opens its own
// connection pool, and spawning extras under load exhausts the database's
// connection slots.
export const db = globalThis.prisma ?? new PrismaClient();

globalThis.prisma = db;
