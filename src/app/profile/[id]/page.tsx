import type { NextPage } from "next";
import { fetchAllUsers } from "../../utils/fetchUsers";
import SignedInProfile from "./SignedInProfile";

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

  return (
    <SignedInProfile user_id={ user_id }/>
  );
};

export default Profile;
