import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaLibSql } from "@prisma/adapter-libsql";

export function isDatabaseConfigured(): boolean {
  const tursoUrl = getTursoDatabaseUrl();
  const tursoConfigured = Boolean(tursoUrl && process.env.TURSO_AUTH_TOKEN);

  // Vercel's filesystem is ephemeral, so a deployment must use Turso. The
  // local adapter below remains available for development as documented.
  return tursoConfigured || process.env.VERCEL !== "1";
}

/**
 * `DATABASE_URL` is the standard Prisma/Turso variable and is what existing
 * deployments use. Keep `TURSO_DATABASE_URL` as an explicit alias so either
 * documented configuration works without silently disabling writes.
 */
function getTursoDatabaseUrl(): string | undefined {
  return process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
}

export function createPrismaAdapter() {
  const tursoUrl = getTursoDatabaseUrl();
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
