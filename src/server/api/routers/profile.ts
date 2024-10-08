import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { filterUserForClient } from "~/app/_utils/filterUserForClient";

export const profileRouter = createTRPCRouter({
  getUserById: privateProcedure
    .input(
      z.object({
        user_id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { user_id } = input;

      const user_data = await clerkClient().users.getUser(user_id);
      
      if (!user_data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User Not Found",
        });
      }

      const user_posts = await ctx.db.post.findMany({
        where: {
          author_id: user_id
        },
        orderBy: { createdAt: 'desc' }
      })

      return {
        ...filterUserForClient(user_data),
        user_posts
      };
    }),

    getUserByIdCustom: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { user_id } = input;

      const user_data = await clerkClient().users.getUser(user_id);

      if (!user_data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User Not Found",
        });
      }

      const user_posts = await ctx.db.post.findMany({
        where: {
          author_id: user_id
        },
        orderBy: { createdAt: 'desc' }
      })

      return {
        ...filterUserForClient(user_data),
        user_posts
      };
    }),
});
