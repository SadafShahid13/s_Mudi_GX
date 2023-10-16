import { adminProcedure } from "../../../../index";
import { z } from "zod";
import _ from "lodash";

const clientSchema = z.object({
  id: z.number(),
  Name: z.string(),
});

export const getClientProcedure = adminProcedure
  .input(
    z.object({
      id: z.number(),
    })
  )
  .output(clientSchema)
  .query(async (opts) => {
    const { ctx, input } = opts;
    const client = await queryDatabaseForSingleClient(input.id);

    if (!client.row) {
      throw new Error(`Client with id ${input.id} not found.`);
    }

    // Ensure the return type matches the expected schema
    return {
      id: client.row.id,
      Name: client.row.Name,
    };
  });

type QueryResultSingle = {
  row?: { [key: string]: any };
  rowCount: number;
};

const mockClientData = [
  { id: 1, Name: "Client A" },
  { id: 2, Name: "Client B" },
  { id: 3, Name: "Client C" },
];

async function queryDatabaseForSingleClient(
  id: number
): Promise<QueryResultSingle> {
  const client = mockClientData.find((client) => client.id === id);
  if (client) {
    return {
      row: client,
      rowCount: 1,
    };
  }
  return {
    rowCount: 0,
  };
}
