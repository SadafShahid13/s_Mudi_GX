import { databaseUrl } from "./config";
import { createPool, DatabasePool } from "slonik";

// Create a function to initialize the pool
async function initializePool(): Promise<DatabasePool> {
  return createPool(databaseUrl);
}

export const pool = initializePool();
