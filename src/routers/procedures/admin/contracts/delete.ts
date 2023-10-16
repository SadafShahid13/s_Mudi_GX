import { adminProcedure } from "../../../../index";
import { z } from "zod";
import _ from "lodash";

const contractSchema = z.object({
  id: z.number(),
  client_id: z.number(),
  start_at: z.string(), // Assuming date as a string, but you can use z.date() if you have Date objects
  end_at: z.string(),
  created_at: z.string(),
  price_sold_at: z.number(),
});

const mockContractData = [
  // Sample data - adjust as needed
  {
    id: 1,
    client_id: 1,
    start_at: "2023-01-01",
    end_at: "2023-12-31",
    created_at: "2023-01-01",
    price_sold_at: 500,
  },
  // ... more sample contracts
];

export const deleteContractProcedure = adminProcedure
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
    const contractIndex = mockContractData.findIndex(
      (contract) => contract.id === input.id
    );

    if (contractIndex === -1) {
      throw new Error(`Contract with id ${input.id} not found.`);
    }

    mockContractData.splice(contractIndex, 1);
    return { success: true };
  });
