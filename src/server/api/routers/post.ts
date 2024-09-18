import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst();

    return post ?? null;
  }),

  getAllPosts: publicProcedure.query(({ ctx }) => {
    const post = ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });

    return post;
  })
});
