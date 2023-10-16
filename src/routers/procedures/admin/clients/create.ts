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

export const createClientProcedure = adminProcedure
  .input(
    z.object({
      Name: z.string(),
    })
  )
  .output(clientSchema)
  .query(async (opts) => {
    const { input } = opts;
    const newId = mockClientData[mockClientData.length - 1].id + 1;
    const newClient = { id: newId, Name: input.Name };

    mockClientData.push(newClient);
    return newClient;
  });
