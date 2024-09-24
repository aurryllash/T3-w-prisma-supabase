import { TRPCError } from "@trpc/server";
import { api } from "~/trpc/server";
import { PageLayout } from "../_components/layout";
import type { NextPage } from "next";
import Image from "next/image";

const Profile: NextPage<{ params: { id: string } }> = async ({ params }) => {
  const { id } = params;
  const user_id = id.startsWith("%40") ? id.slice(3) : "";
  let data;
  let posts;

  try {
    data = await api.profile.getUserById({
      user_id: user_id,
    });
    posts = await api.post.getById({
      user_id: user_id
    })
    if(!data) 
      return <div>No Users Data</div>

    if(!posts) 
      return <div>Do not have an posts</div>

  } catch (error) {
    if (error instanceof TRPCError) {
      throw new TRPCError({
        code: "BAD_REQUEST",
      });
    } else {
      console.error("Unexpected Error:", error);
      return <div>Something went wrong.</div>;
    }
  }

  return (
    <PageLayout>
      <div className="flex flex-col items-center overflow-hidden">
        <h1 className="h-full">{data.fullName?.toUpperCase()}</h1>
        <Image src={data.imageUrl} width={200} height={200} alt={"Profile image"}  className="border-2 border-slate-200 bg-white rounded-[50%]"/>

        <ul>
          {posts && posts?.length !== 0 ? (
            posts.map((post) => {
              return <p key={post.author_id}>{ post.name }</p>
            })
          ) : (
            <p className="flex items-center justify-center">There is no posts.</p>
          )}
        </ul>
      </div>
    </PageLayout>
  );
};

export default Profile;
