import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import { filterUserForClient } from "~/app/utils/filterUserForClient";
import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

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

    return posts.map(post => ({
      post,
      author: users.find((user) => user.id === post.author_id)
    }));
  }),

  deletePost: privateProcedure
  .input(z.object({ post_id: z.number() }))
  .mutation(({ ctx, input }) => {

    const post_id = input.post_id
    // const authorId = ctx.currentUser.userId;

    const deletedPost = ctx.db.post.delete({
      where: {
        id: post_id
      }
    });

    return deletedPost;
  }),

  getById: publicProcedure
  .input(z.object({
    user_id: z.string()
  }))
  .query(async ({ ctx, input }) => {
    const { user_id } = input;

    const posts = await ctx.db.post.findMany({
      where: {
        author_id: user_id
      }
    })

    return posts;
  })
  

});

