// import { api } from "~/trpc/react";
import { api } from "~/trpc/server";
import Image from "next/image";

export default async function Post() {
  // const [latestPost] = api.post.getLatest.useSuspenseQuery();
  // const { data } = api.post.getAllPosts.useQuery();
  const data = await api.post.getAllPosts();

  return (
    <div className="w-full">
      <div className="flex flex-col">
        <ul>
          {data && data?.length !== 0 ? (
            data.map((userData) => {
              return (
                <div key={userData.post.id} className="p-4 border-b border-slate-500">
                  <div>
                    <Image
                      className="border-red rounded-[50%] bg-white"
                      src={
                        userData.author?.profileImageUrl
                          ? userData.author?.profileImageUrl
                          : ""
                      }
                      width={50}
                      height={50}
                      alt="profile picture"
                    ></Image>
                  </div>
                  <li className=" p-4">
                    {userData.post.name}
                  </li>
                </div>
              );
            })
          ) : (
            <p>There is no posts.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
