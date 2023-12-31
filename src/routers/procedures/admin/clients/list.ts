import { adminProcedure } from "../../../../index";
import { z } from "zod";
import _ from "lodash";

const clientSchema = z.object({
  id: z.string(), // If your 'id' is a number, you should use z.number() instead.
  Name: z.string(),
});

export const listClientProcedure = adminProcedure
  .output(
    z.object({
      clients: z.array(
        clientSchema.pick({
          id: true,
          Name: true,
        })
      ),
    })
  )
  .query(async ({ ctx, input }) => {
    const result = await queryDatabase("SELECT id, Name FROM clients");

    const clients = result.rows.map((row: any) => _.pick(row, "id", "Name"));

    return {
      clients: clients,
    };
  });
type QueryResult = {
  rows: Array<{ [key: string]: any }>;
  rowCount: number;
  // ... other possible properties
};
const mockClientData = [
  { id: "1", Name: "Client A" },
  { id: "2", Name: "Client B" },
  { id: "3", Name: "Client C" },
];
async function queryDatabase(
  sql: string,
  parameters?: any[]
): Promise<QueryResult> {
  if (sql.includes("SELECT id, Name FROM clients")) {
    return {
      rows: mockClientData,
      rowCount: mockClientData.length,
    };
  }
  throw new Error(`Unexpected query: ${sql}`);
}
