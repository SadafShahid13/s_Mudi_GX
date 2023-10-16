import { adminProcedure } from "../../../../index";
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

export const deleteClientProcedure = adminProcedure
  .input(
    z.object({
      id: z.number(),
    })
  )
  .output(
    z.object({
      success: z.boolean(),
    })
  )
  .query(async (opts) => {
    const { input } = opts;
    const clientIndex = mockClientData.findIndex(
      (client) => client.id === input.id
    );

    if (clientIndex === -1) {
      throw new Error(`Client with id ${input.id} not found.`);
    }

    mockClientData.splice(clientIndex, 1);
    return { success: true };
  });
