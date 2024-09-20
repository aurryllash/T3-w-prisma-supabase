import { HydrateClient } from "~/trpc/server";
import Post from './_components/post'


export default async function Home() {

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex flex-col justify-center items-center h-screen">
        <div className="w-full h-full md:max-w-screen-xl  border-x border-slate-400">
          <Post></Post>
        </div>
      </main>
    </HydrateClient>
  );
}
