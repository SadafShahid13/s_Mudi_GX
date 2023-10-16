import { authenticatedProcedure } from "../../index";
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

export const getContractProcedure = authenticatedProcedure
  .input(
    z.object({
      id: z.number(),
    })
  )
  .output(contractSchema)
  .query(async (opts) => {
    const { input } = opts;
    const contract = mockContractData.find(
      (contract) => contract.id === input.id
    );

    if (!contract) {
      throw new Error(`Contract with id ${input.id} not found.`);
    }

    return contract;
  });
