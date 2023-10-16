import { router } from "../../index";
import { getContractProcedure } from "./get";
import { createContractProcedure } from "./create";
import { updateContractProcedure } from "./update";
import { deleteContractProcedure } from "./delete";
import { listClientProcedure } from "./list";

export const contractsRouter = router({
  list: listClientProcedure,
  get: getContractProcedure,
  create: createContractProcedure,
  update: updateContractProcedure,
  delete: deleteContractProcedure,
});
