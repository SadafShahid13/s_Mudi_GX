import { router } from "../../../../index";
import { getShopProcedure } from "./get";
import { createShopProcedure } from "./create";
import { updateShopProcedure } from "./update";
import { deleteShopProcedure } from "./delete";
import { listShopProcedure } from "./list";

export const shopsRouter = router({
  list: listShopProcedure,
  get: getShopProcedure,
  create: createShopProcedure,
  update: updateShopProcedure,
  delete: deleteShopProcedure,
});
