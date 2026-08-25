import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaLibSql } from "@prisma/adapter-libsql";

export function isDatabaseConfigured(): boolean {
  return true;
}

export function createPrismaAdapter() {
  const databaseUrl = process.env.DATABASE_URL || "file:./dev.db";

  if (databaseUrl.startsWith("libsql://")) {
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!authToken) {
      return new PrismaBetterSqlite3({ url: "file:./dev.db" });
    }

    return new PrismaLibSql({ url: databaseUrl, authToken });
  }

  return new PrismaBetterSqlite3({ url: databaseUrl.startsWith("file:") ? databaseUrl : "file:./dev.db" });
}


