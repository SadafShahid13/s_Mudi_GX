import { adminProcedure } from "../../../../index";
import { z } from "zod";
import _ from "lodash";

const shopSchema = z.object({
  id: z.number(),
  shop_name: z.string(),
  address: z.string(), // Assuming date as a string, but you can use z.date() if you have Date objects
  geo_location: z.string(),
});

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

export const updateShopProcedure = adminProcedure
  .input(
    z.object({
      id: z.number(),
      start_at: z.string(),
      end_at: z.string(),
      price_sold_at: z.number(),
    })
  )
  .output(shopSchema)
  .query(async (opts) => {
    const { input } = opts;
    const shop = mockShopData.find((shop) => shop.id === input.id);

    if (!shop) {
      throw new Error(`shop with id ${input.id} not found.`);
    }

    Object.assign(shop, input);
    return shop;
  });
