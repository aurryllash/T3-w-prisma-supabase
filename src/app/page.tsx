import { HydrateClient } from "~/trpc/server";
import PostList from './_components/postList'


export default async function Home() {

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex flex-col justify-center items-center h-screen">
        <div className="w-full h-full md:max-w-screen-xl  border-x border-slate-400">
          <PostList></PostList>
        </div>
      </main>
    </HydrateClient>
  );
}
