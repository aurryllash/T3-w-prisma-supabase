// import { api } from "~/trpc/react";
import { api } from "~/trpc/server";
import Image from "next/image";
import { RouterOutputs } from "~/trpc/react";

type PostWithUser = RouterOutputs["post"]["getAllPosts"][number];

const PostView = ({ post, author }: PostWithUser) => {
  return (
    <div key={post.id} className="border-b border-slate-500 p-4">
      <div>
        <Image
          className="border-red rounded-[50%] bg-white"
          src={author?.profileImageUrl ? author?.profileImageUrl : ""}
          width={50}
          height={50}
          alt="profile picture"
        ></Image>
      </div>
      <li className="p-4">{post.name}</li>
    </div>
  );
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
            data.map(({ post, author }) => {
              // return (
              //   <div key={post.id} className="border-b border-slate-500 p-4">
              //     <div>
              //       <Image
              //         className="border-red rounded-[50%] bg-white"
              //         src={
              //           author?.profileImageUrl ? author?.profileImageUrl : ""
              //         }
              //         width={50}
              //         height={50}
              //         alt="profile picture"
              //       ></Image>
              //     </div>
              //     <li className="p-4">{post.name}</li>
              //   </div>
              // );
              return <PostView post={post} author={author} key={post.id}/>
            })
          ) : (
            <p>There is no posts.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
