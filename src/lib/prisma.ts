import { PrismaClient } from "@prisma/client";
import { createPrismaAdapter, isDatabaseConfigured } from "@/lib/prisma-adapter";

export { isDatabaseConfigured };

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function getPrisma(): PrismaClient | null {
  if (!isDatabaseConfigured()) {
    return null;
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({ adapter: createPrismaAdapter() });
  }

  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop: keyof PrismaClient) {
    const client = getPrisma();
    if (!client) {
      throw new Error(
        "DATABASE_URL is required to initialize Prisma. Please configure your database environment variable."
      );
    }
    const value = client[prop];
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});

