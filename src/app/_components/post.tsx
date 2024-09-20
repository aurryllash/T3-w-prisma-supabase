// import { api } from "~/trpc/react";
import { api } from "~/trpc/server";
import { PostView } from "./postView";

export default async function Post() {
  // const [latestPost] = api.post.getLatest.useSuspenseQuery();
  // const { data } = api.post.getAllPosts.useQuery();
  const data = await api.post.getAllPosts();

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <ul>
          {data && data?.length !== 0 ? (
            data.map(({ post, author }) => {
              return <PostView post={post} author={author} key={post.id} />
            })
          ) : (
            <p>There is no posts.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
