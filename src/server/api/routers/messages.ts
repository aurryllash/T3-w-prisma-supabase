import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const messageRouter = createTRPCRouter({
    addMessage: publicProcedure.input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
        const { text } = input;

        const newMessage = await prisma.message.create({
            data: {
                text,
            },
        });
        return newMessage
    }),
    getMessage: publicProcedure.query(async () => {
        const messages = await prisma.message.findMany();

        return messages;
    })
})