import { authenticatedProcedure } from "../../index";
import { z } from "zod";
import _ from "lodash";

const mockClientData = [
  { id: 1, Name: "Client A" },
  { id: 2, Name: "Client B" },
  { id: 3, Name: "Client C" },
];

const clientSchema = z.object({
  id: z.number(),
  Name: z.string(),
});

export const updateClientProcedure = authenticatedProcedure
  .input(
    z.object({
      id: z.number(),
      Name: z.string(),
    })
  )
  .output(clientSchema)
  .query(async (opts) => {
    const { input } = opts;
    const client = mockClientData.find((client) => client.id === input.id);

    if (!client) {
      throw new Error(`Client with id ${input.id} not found.`);
    }

    client.Name = input.Name;
    return client;
  });
