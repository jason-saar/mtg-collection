// https://www.prisma.io/docs/orm/more/troubleshooting/nextjs
// Next.js hot-reloading can spin up multiple Prisma clients
// Creating a global Prisma Client instance using a global variable avoid this
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;