import { PrismaClient } from "@prisma/client";

let globalPrisma = null;

export const prisma = globalPrisma || new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") {
  globalPrisma = prisma;
}
