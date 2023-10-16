import { z } from "zod";
import { router, t } from "../../../index";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { pool } from "../../../../db";
import { sql } from "slonik";

export const adminAuthRouter = router({
  login: t.procedure
    .input(
      z.object({
        identifier: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Search for user by username, email, or phone number
      const user = await (
        await pool
      ).connect(async (connection) => {
        return connection.maybeOne(
          sql.unsafe`
                        SELECT * FROM users 
                        WHERE username = ${input.identifier}
                        OR email = ${input.identifier}
                        OR phone_number = ${input.identifier}
                    `
        );
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "user-not-found",
        });
      }

      if (user.password !== input.password) {
        // Note: In production, consider using bcrypt or argon2 for password hashing and verification.
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "wrong-password",
        });
      }

      const accessToken = nanoid();

      await (
        await pool
      ).connect(async (connection) => {
        return connection.query(
          sql.unsafe`
                        INSERT INTO access_tokens(created_at, access_token, user_id)
                        VALUES(${new Date().toISOString()}, ${accessToken}, ${
            user.id
          })

                    `
        );
      });

      return {
        access_token: accessToken,
      };
    }),
});
