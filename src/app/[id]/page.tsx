import { TRPCError } from "@trpc/server";
import { api } from "~/trpc/server";
import { PageLayout } from "../_components/layout";
import { NextPage } from "next";

const Profile: NextPage<{params: { id: string }}> = async ({ params }) => {
  const { id } = params;
  const user_id = id.startsWith("%40") ? id.slice(3) : "";
  
  try {
    const data = await api.profile.getUserById({
      user_id: user_id,
    });

    return (
      <PageLayout>
        <div className="flex overflow-hidden flex-col items-center">
          <h1 className="h-full">{data.fullName?.toUpperCase()}</h1>
        </div>
      </PageLayout>
    );
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
};

export default Profile;
