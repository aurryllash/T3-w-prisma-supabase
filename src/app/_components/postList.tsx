"use client"

import { PostView } from "./postView";
import { api } from "~/trpc/react";

export default function Post() {

  const { data, refetch, isLoading } = api.post.getAllPosts.useQuery();

  if(isLoading) 
    return <h1 className="flex items-center justify-center">Loading...</h1>
  return (
    <div className="w-full">
      <div className="flex flex-col">
        <ul>
          {data && data?.length !== 0 ? (
            data.map(({ post, author }) => {
              return <PostView post={post} author={author} key={post.id} refetch={refetch}/>
            })
          ) : (
            <p className="flex items-center justify-center">There is no posts.</p>
          )}
        </ul>
      </div>
    </div>
  );
}




