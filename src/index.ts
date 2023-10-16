import { initTRPC, TRPCError } from "@trpc/server";
import { SuperJSON } from "superjson";
import { type Context } from "./context";

export const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
  errorFormatter({ error, shape }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        ...("ui" in error &&
          typeof error.ui === "string" && { ui: error.ui as string }),
      },
    };
  },
});

export const router = t.router;
export const middleware = t.middleware;

export class SpecificError extends TRPCError {
  public ui?: string;

  constructor(
    options: ConstructorParameters<typeof TRPCError>[0] & {
      ui: string;
    }
  ) {
    super(options);
    this.ui = options.ui;
  }
}

const isAdmin = middleware(async (opts) => {
  const { ctx } = opts;

  if (!ctx.auth.isAuthenticated && !ctx.auth.isAdmin) {
    throw new SpecificError({
      code: "UNAUTHORIZED",
      ui: "needs-authentication",
    });
  }

  const auth = ctx.auth;

  return opts.next({
    ctx: {
      ...ctx,
      auth: auth,
    },
  });
});

const isUser = middleware(async (opts) => {
  const { ctx } = opts;

  if (!ctx.auth.isAuthenticated && ctx.auth.isAdmin) {
    throw new SpecificError({
      code: "UNAUTHORIZED",
      ui: "needs-authentication",
    });
  }

  const auth = ctx.auth;

  return opts.next({
    ctx: {
      ...ctx,
      auth: auth,
    },
  });
});

export const publicProcedure = t.procedure;

export const adminProcedure = publicProcedure.use(isAdmin);
export const userProcedure = publicProcedure.use(isUser);
