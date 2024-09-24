import { clerkClient } from "@clerk/nextjs/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const usersRouter = createTRPCRouter({
    getAllUser: publicProcedure
        .query(async () => {
            const users = (
                await clerkClient.users.getUserList()
            ).data.map(user => ({
                id: user.id
            }));

            return users;
        })
})

export default usersRouter;