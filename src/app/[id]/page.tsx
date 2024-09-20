import { TRPCError } from "@trpc/server";
import { api } from "~/trpc/server";

const Profile = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user_id = id.startsWith("%40") ? id.slice(3) : "";
  try {
    const data = await api.profile.getUserById({
      user_id: user_id
    })
  
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="min-h-[100vh] w-full border-x border-slate-400 bg-black md:max-w-screen-xl flex flex-col items-center">
          <h1>{ data.fullName?.toLocaleUpperCase() }</h1>
        </div>
      </div>
    );
  } catch(error) {
    if(error instanceof TRPCError) {
      throw new TRPCError({
        code: "BAD_REQUEST"
      })
    } else {
      console.error("Unexpected Error:", error);
      return <div>Something went wrong.</div>;
    }
  }
  
};

export default Profile;
