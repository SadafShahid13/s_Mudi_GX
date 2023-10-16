import { adminProcedure } from "../../../../index";
import { z } from "zod";
import _ from "lodash";

const mockShopData = [
  // Sample data - adjust as needed
  {
    id: 1,
    shop_name: "James",
    address: "Baker Street",
    geo_location: "19.2 13.2",
  },
  // ... more sample shops
];

export const deleteShopProcedure = adminProcedure
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
    const shopIndex = mockShopData.findIndex((shop) => shop.id === input.id);

    if (shopIndex === -1) {
      throw new Error(`shop with id ${input.id} not found.`);
    }

    mockShopData.splice(shopIndex, 1);
    return { success: true };
  });
