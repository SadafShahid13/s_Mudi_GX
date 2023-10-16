import { adminProcedure } from "../../../../index";
import { z } from "zod";
import _ from "lodash";

const mockSpaceData = [
  // Sample data - adjust as needed
  {
    id: 1,
    shop_id: 1,
    label: "james@rodiguez.com",
    size: "0123456789",
    prominence: 0.1,
    price: 5,
  },
  // ... more sample spaces
];

export const deleteSpaceProcedure = adminProcedure
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
    const spaceIndex = mockSpaceData.findIndex(
      (space) => space.id === input.id
    );

    if (spaceIndex === -1) {
      throw new Error(`space with id ${input.id} not found.`);
    }

    mockSpaceData.splice(spaceIndex, 1);
    return { success: true };
  });
