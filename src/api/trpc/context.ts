import { inferAsyncReturnType, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { returnOf } from "scope-utilities";
import { Pool, PoolClient } from "pg";

// Setting up a PostgreSQL connection pool
const pool = new Pool({
  user: "username",
  host: "localhost",
  database: "mydb",
  password: "password",
  port: 5432,
});

export type Context = {
  db: PoolClient;
  auth: {
    isAuthenticated: boolean;
    // ... other auth properties if any
  };
};

// Create the context for tRPC
export async function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions): Promise<Context> {
  const db = await pool.connect();
  const auth = {
    isAuthenticated: true, // Replace this with actual authentication logic.
  };
  // Ensure that the db client is released back to the pool after each request
  res.on("finish", () => {
    db.release();
  });

  return { db, auth };
}

// Infer the type of the async function to ensure type safety throughout our app
export type AppContext = inferAsyncReturnType<typeof createContext>;
