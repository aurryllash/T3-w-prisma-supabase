import type { NextPage } from "next";
import { fetchAllUsers } from "../../utils/fetchUsers";
import SignedInProfile from "./SignedInProfile";
import { auth } from "@clerk/nextjs/server";
import NotSignedInProfile from "./notSignedInProfile";

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
  console.log('user: ', user)

  return (
    <>
        { user && user.userId == user_id ?  <SignedInProfile user_id={ user_id } /> : <NotSignedInProfile user_id={ user_id } />}
    </>

    // { user && user.userId }
    // <SignedInProfile user_id={ user_id }/>
    // <div>Page</div>
  );
};

export default Profile;
