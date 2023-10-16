import { router } from "../../../../index";
import { getuserProcedure } from "./get";
import { createUserProcedure } from "./create";
import { updateUserProcedure } from "./update";
import { deleteUserProcedure } from "./delete";
import { listUserProcedure } from "./list";

export const usersRouter = router({
  list: listUserProcedure,
  get: getuserProcedure,
  create: createUserProcedure,
  update: updateUserProcedure,
  delete: deleteUserProcedure,
});
