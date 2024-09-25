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

  return (
    <SignedInProfile params={params}/>
  );
};

export default Profile;
