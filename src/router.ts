import { router } from "./index";
import { clientsRouter } from "./routers/procedures/admin/clients/index";
import { contractsRouter } from "./routers/procedures/admin/contracts/index";
// import { usersRouter } from "./procedures/users/index";
// import { shopsRouter } from "./procedures/shops/index";
// import { spacesRouter } from "./procedures/spaces/index";
export const appRouter = router({
  clients: clientsRouter,
  contracts: contractsRouter,
  //   users : usersRouter,
  //   shops : shopsRouter,
  //   spaces : spacesRouter,
});

export type AppRouter = typeof appRouter;
