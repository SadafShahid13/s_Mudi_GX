import { adminProcedure } from "../../../../index";
import { z } from "zod";
import _ from "lodash";

const shopSchema = z.object({
  id: z.number(),
  shop_name: z.string(),
  address: z.string(),
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

export const listShopProcedure = adminProcedure
  .output(
    z.object({
      contracts: z.array(shopSchema),
    })
  )
  .query(async () => {
    return { contracts: mockShopData };
  });
