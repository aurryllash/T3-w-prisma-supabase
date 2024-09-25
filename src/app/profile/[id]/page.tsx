import { TRPCError } from "@trpc/server";
import { api } from "~/trpc/server";
import PageLayout from "../../_components/layout";
import type { NextPage } from "next";
import Image from "next/image";
import { fetchAllUsers } from "../../utils/fetchUsers";
import Navigation from "../../_components/Header/navigation";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const users = await fetchAllUsers();

  return users.map((user) => ({
    id: user,
  }));
}

const Profile: NextPage<PageProps> = async ({ params }) => {
  const { id } = params;
  const user_id = id.startsWith("%40") ? id.slice(3) : "";
  if (user_id == 'undefined') {
    redirect('/');
    return null;
  }

  const data = await api.profile.getUserById({
    user_id: user_id,
  });
  console.log("UUUUUUUUUU")
  if (!data) return <div>No Users Data</div>;

  if (data.user_posts.length < 1) return <div>Do not have an posts</div>;

  return (
    <PageLayout>
      <Navigation />
      <div className="flex flex-col items-start">
        <div className="relative h-48 w-full bg-slate-500">
          <div className="absolute left-1 top-24 flex flex-col items-center gap-4">
            <Image
              src={data.imageUrl}
              width={200}
              height={200}
              alt={"Profile image"}
              className="rounded-[50%] border-2 border-slate-200 bg-white"
            />
            <h1 className="h-full text-2xl">{data.fullName?.toUpperCase()}</h1>
          </div>
        </div>

        <ul>
          {data.user_posts && data.user_posts?.length > 0 ? (
            data.user_posts.map((post, index) => {
              return <p key={index}>{post.name}</p>;
            })
          ) : (
            <p className="flex items-center justify-center">
              There is no posts.
            </p>
          )}
        </ul>
      </div>
    </PageLayout>
  );
};

export default Profile;
