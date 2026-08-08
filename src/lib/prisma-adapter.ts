import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaLibSql } from "@prisma/adapter-libsql";

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function createPrismaAdapter() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to initialize Prisma.");
  }

  if (databaseUrl.startsWith("libsql://")) {
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!authToken) {
      throw new Error("TURSO_AUTH_TOKEN is required for a libSQL database.");
    }

    return new PrismaLibSql({ url: databaseUrl, authToken });
  }

  if (databaseUrl.startsWith("file:")) {
    return new PrismaBetterSqlite3({ url: databaseUrl });
  }

  throw new Error("DATABASE_URL must use either a file: or libsql:// URL.");
}

