"use client";

import { api, type RouterOutputs } from "~/trpc/react";
import Image from "next/image";
import { TRPCError } from "@trpc/server";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import user from "../utils/user";
import { useRouter } from "next/navigation";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["post"]["getAllPosts"][number];

export const PostView = ({ post, author }: PostWithUser) => {

  const router = useRouter();
  const userData = user();

  const deletePost = api.post.deletePost.useMutation({
    onSuccess: () => {
      toast.success("Successfully toasted!");
      router.refresh();
    },
    onError: async () => {
      new TRPCError({
        message: "Error",
        code: "BAD_GATEWAY",
      });
      toast.error("Do not have permission");
    },
  });
  
  const handleClick = async () => {
    try {
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
      className="flex justify-between gap-3 border-b p-4"
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
              <span className="ml-2 text-sm text-slate-300">{` • ${dayjs(post.createdAt).fromNow()}`}</span>
            </div>
            <li>{post.name}</li>
          </div>
        </Link>
      </div>

      {userData?.firstName && <button
        type="button"
        className="mb-2 me-2 flex rounded-lg border  bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700"
        onClick={handleClick}
      >
        DELETE
      </button>}

      <Toaster position="top-right" reverseOrder={false} />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};
