import { router } from "../../../../index";
import { getClientProcedure } from "./get";
import { createClientProcedure } from "./create";
import { updateClientProcedure } from "./update";
import { deleteClientProcedure } from "./delete";
import { listClientProcedure } from "./list";

export const clientsRouter = router({
  list: listClientProcedure,
  get: getClientProcedure,
  create: createClientProcedure,
  update: updateClientProcedure,
  delete: deleteClientProcedure,
});
