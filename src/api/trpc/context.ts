import { inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { pool } from "../../../db";

export type Context = {
  db: typeof pool;
  auth: {
    isAuthenticated: boolean;
  };
};

export async function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions): Promise<Context> {
  const auth = {
    isAuthenticated: true,
  };

  return { db: pool, auth };
}

export type AppContext = inferAsyncReturnType<typeof createContext>;
