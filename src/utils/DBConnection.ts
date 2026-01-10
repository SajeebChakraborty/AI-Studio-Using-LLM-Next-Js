import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/node-postgres';
import { drizzle as drizzlePglite } from 'drizzle-orm/pglite';
import { Pool } from 'pg';

import { Env } from '@/libs/Env';
import * as schema from '@/models/Schema';

// Need a database for production? Just claim it by running `npm run neon:claim`.
// Tested and compatible with Next.js Boilerplate
export const createDbConnection = () => {
  if (!Env.DATABASE_URL) {
    const client = new PGlite();
    return drizzlePglite({ client, schema });
  }

  const pool = new Pool({
    connectionString: Env.DATABASE_URL,
    max: 1,
  });

  return drizzle({
    client: pool,
    schema,
  });
};
