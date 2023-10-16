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

export const createContractProcedure = authenticatedProcedure
  .input(
    z.object({
      client_id: z.number(),
      start_at: z.string(),
      end_at: z.string(),
      price_sold_at: z.number(),
    })
  )
  .output(contractSchema)
  .query(async (opts) => {
    const { input } = opts;
    const newId =
      mockContractData.length > 0
        ? mockContractData[mockContractData.length - 1].id + 1
        : 1;
    const newContract = {
      id: newId,
      created_at: new Date().toISOString(),
      ...input,
    };

    mockContractData.push(newContract);
    return newContract;
  });
