import { drizzle } from "drizzle-orm/node-postgres";
  import pg from "pg";
  import * as schema from "./schema";

  const { Pool } = pg;

  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL must be set. Did you forget to provision a database?",
    );
  }

  // Render and most hosted Postgres require SSL. Skip SSL only for localhost.
  const dbUrl = process.env.DATABASE_URL;
  const isLocalhost =
    dbUrl.includes("localhost") || dbUrl.includes("127.0.0.1");

  export const pool = new Pool({
    connectionString: dbUrl,
    ssl: isLocalhost ? false : { rejectUnauthorized: false },
  });
  export const db = drizzle(pool, { schema });

  export * from "./schema";
  