"use client";

const Profile = ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const user = username.startsWith('%40') ? username.slice(3) : '';
  console.log(user)
  return (
    <div className="flex flex-col items-center">
      <div className="min-h-[100vh] w-full border-x border-slate-400 bg-black md:max-w-screen-xl">
        <h1>PROFILE PAGE</h1>
      </div>
    </div>
  );
};

export default Profile;
