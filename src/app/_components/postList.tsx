import { api } from "~/trpc/server";
import { PostView } from "./postView";
import Header from "./Header/Header";

export default async function Post() {
  const data = await api.post.getAllPosts();

  return (
    <>
      <Header />
      
      <div className="w-full">
        <div className="flex flex-col">
          <ul>
            {data && data?.length !== 0 ? (
              data.map(({ post, author }) => {
                return <PostView post={post} author={author} key={post.id} />;
              })
            ) : (
              <p className="flex items-center justify-center">
                There is no posts.
              </p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
