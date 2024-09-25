import type { NextPage } from "next";
import { fetchAllUsers } from "../../_utils/fetchUsers";
import { auth } from "@clerk/nextjs/server";
import AuthorProfile from "~/app/_components/profile/authorProfile";
import CustomProfile from "~/app/_components/profile/customProfile";

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

  const user = auth();

  return (
    <>
        { user && user.userId == user_id ?  <AuthorProfile user_id={ user_id } /> : <CustomProfile user_id={ user_id } /> }
    </>
  );
};

export default Profile;
