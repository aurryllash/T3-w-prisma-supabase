import { postRouter } from "~/server/api/routers/post";
import { messageRouter } from "~/server/api/routers/messages";
import { profileRouter } from "~/server/api/routers/profile";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import usersRouter from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  message: messageRouter,
  profile: profileRouter,
  users: usersRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
