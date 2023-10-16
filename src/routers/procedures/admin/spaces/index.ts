import { router } from "../../../../index";
import { getSpaceProcedure } from "./get";
import { createSpaceProcedure } from "./create";
import { updateSpaceProcedure } from "./update";
import { deleteSpaceProcedure } from "./delete";
import { listSpaceProcedure } from "./list";

export const spacesRouter = router({
  list: listSpaceProcedure,
  get: getSpaceProcedure,
  create: createSpaceProcedure,
  update: updateSpaceProcedure,
  delete: deleteSpaceProcedure,
});
