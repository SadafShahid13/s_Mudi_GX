import { adminProcedure } from "../../../../index";
import { z } from "zod";
import _ from "lodash";

const spaceSchema = z.object({
  id: z.number(),
  shop_id: z.number(),
  label: z.string(),
  size: z.string(),
  prominence: z.number(),
  price: z.number(),
});

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

export const getSpaceProcedure = adminProcedure
  .input(
    z.object({
      id: z.number(),
    })
  )
  .output(spaceSchema)
  .query(async (opts) => {
    const { input } = opts;
    const space = mockSpaceData.find((space) => space.id === input.id);

    if (!space) {
      throw new Error(`space with id ${input.id} not found.`);
    }

    return space;
  });
