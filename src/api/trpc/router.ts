import { router } from "./index";
import { clientsRouter } from "./procedures/clients/index";
import { contractsRouter } from "./procedures/contracts/index";
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
