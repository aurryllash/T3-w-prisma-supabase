
// import { api } from "~/trpc/react";

import { GetStaticProps } from "next";
import { api } from "~/trpc/server";

type Data = {
  id: number;
  name: string;
  author_id: string;
  createdAt: Date;
  updatedAt: Date;
};
export default async function Post() {
  // const [latestPost] = api.post.getLatest.useSuspenseQuery();
  // const { data } = api.post.getAllPosts.useQuery();
  const data = await api.post.getAllPosts();

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <ul>
        {data && data?.length !== 0 ? (
          data.map((post) => <li className="border-b border-slate-500 p-4" key={post.id}>{post.name}</li>)
        ) : (
          <p >There is no posts.</p>
        )} 
        </ul>
      </div>
    </div>
  );
}