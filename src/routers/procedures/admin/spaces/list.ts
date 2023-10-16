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

export const listSpaceProcedure = adminProcedure
  .output(
    z.object({
      contracts: z.array(spaceSchema),
    })
  )
  .query(async () => {
    return { contracts: mockSpaceData };
  });
