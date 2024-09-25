import { api } from "~/trpc/server";
import PageLayout from "../../_components/layout";
import Image from "next/image";
import Navigation from "../../_components/Header/navigation";

const NotSignedInProfile = async ({ user_id }: { user_id: string }) => {
  const data = await api.profile.getUserById({
    user_id: user_id,
  });

  if (!data) return <div>No Users Data</div>;

  if (data.user_posts.length < 1) return <div>Do not have an posts</div>;

  return (
    <PageLayout>
      <Navigation />
      <div className="flex flex-col items-start">
        <div className="relative mb-48 h-48 w-full bg-slate-500">
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
        <ul className="ml-10">
          {data.user_posts && data.user_posts?.length > 0 ? (
            data.user_posts.map((post, index) => {
              return (
                <li
                  key={index}
                  className="mb-10 w-[60%] rounded-md border-2 border-slate-700 p-4"
                >
                  <p>{post.name}</p>
                </li>
              );
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

export default NotSignedInProfile;
