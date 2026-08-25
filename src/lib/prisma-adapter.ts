import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaLibSql } from "@prisma/adapter-libsql";

export function isDatabaseConfigured(): boolean {
  return Boolean(
    process.env.TURSO_DATABASE_URL &&
    process.env.TURSO_AUTH_TOKEN
  );
}

export function createPrismaAdapter() {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

  // Production: use Turso
  if (tursoUrl && tursoAuthToken) {
    return new PrismaLibSql({
      url: tursoUrl,
      authToken: tursoAuthToken,
    });
  }

  // Local development: use local SQLite
  const databaseUrl =
    process.env.LOCAL_DATABASE_URL || "file:./dev.db";

  return new PrismaBetterSqlite3({
    url: databaseUrl,
  });
}