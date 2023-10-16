import { inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { pool } from "../db";
import { returnOf } from "scope-utilities";

export type Context = {
  db: typeof pool;
  auth: {
    isAuthenticated: boolean;
    isAdmin?: boolean;
  };
};

export async function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions): Promise<Context> {
  const auth:
    | {
        isAuthenticated: false;
      }
    | {
        isAuthenticated: true;
        isAdmin: true;
      }
    | {
        isAuthenticated: true;
        isAdmin: false;
      } = await returnOf(async () => {
    if ("User") {
      try {
        return {
          isAuthenticated: true,
          isAdmin: false,
        };
      } catch (error) {
        return {
          isAuthenticated: false,
        };
      }
    } else if ("Admin") {
      try {
        return {
          isAuthenticated: true,
          isAdmin: true,
        };
      } catch (error) {
        return {
          isAuthenticated: false,
        };
      }
    } else {
      return { isAuthenticated: false };
    }
  });

  //     {
  //   isAuthenticated: true, //need changes here
  //   role: UserRole.Admin,
  // };

  return { db: pool, auth };
}

export type AppContext = inferAsyncReturnType<typeof createContext>;
