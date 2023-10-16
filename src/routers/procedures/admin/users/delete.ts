import { adminProcedure } from "../../../../index";
import { z } from "zod";
import _ from "lodash";

const mockUserData = [
  // Sample data - adjust as needed
  {
    id: 1,
    client_id: 1,
    start_at: "2023-01-01",
    end_at: "2023-12-31",
    created_at: "2023-01-01",
    price_sold_at: 500,
  },
  // ... more sample users
];

export const deleteUserProcedure = adminProcedure
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
    const userIndex = mockUserData.findIndex((user) => user.id === input.id);

    if (userIndex === -1) {
      throw new Error(`user with id ${input.id} not found.`);
    }

    mockUserData.splice(userIndex, 1);
    return { success: true };
  });
