import { HydrateClient } from "~/trpc/server";
import PostList from './_components/postList'
import { PageLayout } from "./_components/layout";


export default async function Home() {

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <PageLayout>
        <PostList></PostList>
      </PageLayout>
    </HydrateClient>
  );
}
