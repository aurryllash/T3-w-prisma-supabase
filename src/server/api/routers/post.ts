import { clerkClient, User } from "@clerk/nextjs/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        author_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          author_id: input.author_id,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    const post = ctx.db.post.findFirst();

    return post ?? null;
  }),

  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.author_id),
      })
    ).data.map(filterUserForClient)

    console.log("users: ", users);
    return posts.map(post => ({
      post,
      author: users.find((user) => user.id === post.author_id)
    }));
  }),
});

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.imageUrl
  }
}

