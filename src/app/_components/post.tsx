"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function Post() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();
  const { data } = api.post.getAllPosts.useQuery();

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <ul>
        {data ? (
          [...data]?.map((post) => <li className="border-b border-slate-500 p-4" key={post.id}>{post.name}</li>)
        ) : (
          <p>There is no posts.</p>
        )} 
        </ul>
      </div>
    </div>
  );
}
