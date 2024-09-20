"use client";

import { api, type RouterOutputs } from "~/trpc/react";
import Image from "next/image";
import { TRPCError } from "@trpc/server";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { sendGTMEvent } from '@next/third-parties/google'

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["post"]["getAllPosts"][number];

export const PostView = ({ post, author }: PostWithUser) => {

  const deletePost = api.post.deletePost.useMutation({
    onError: async () => {
      new TRPCError({
        message: "Error",
        code: "BAD_GATEWAY",
      });
    },
  });

  const handleClick = async () => {
    try {
      sendGTMEvent({ event: "ButtonClicked", value: "xzy" })
      await deletePost.mutateAsync({
        post_id: post.id,
      });
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    
      <div
        key={post.id}
        className="flex justify-between gap-3 border-b border-slate-500 p-4"
      >
        <div className="flex gap-5">
          <Link href={`@${author?.id}`}>
            <Image
              className="border-red rounded-[50%] bg-white"
              src={author?.imageUrl ? author?.imageUrl : ""}
              width={50}
              height={50}
              alt="profile picture"
            ></Image>
          </Link>
          <Link href={`/post/${post.id}`}>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <span>{author?.fullName?.toLocaleUpperCase()}</span>
              <span className="text-sm text-slate-300 ml-2">{` • ${dayjs(post.createdAt).fromNow()}`}</span>
            </div>
            <li>{post.name}</li>
          </div>
          </Link>
        </div>
        

        <button
          type="button"
          className="mb-2 me-2 flex rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700"
          onClick={handleClick}
        >
          DELETE
        </button>
      </div>
  );
};
