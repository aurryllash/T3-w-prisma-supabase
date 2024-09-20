import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { filterUserForClient } from "~/app/utils/filterUserForClient";

export const profileRouter = createTRPCRouter({
  getUserById: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { user_id } = input;

      const user_data = await clerkClient.users.getUser(user_id);
      if (!user_data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User Not Found",
        });
      }


      return filterUserForClient(user_data);
    }),
});
