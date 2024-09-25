import { api } from "~/trpc/server";
import PageLayout from "../../_components/layout";
import Image from "next/image";
import Navigation from "../../_components/Header/navigation";

const NotSignedInProfile = async ({ user_id }: { user_id: string }) => {
  try {
    const data = await api.profile.getUserByIdCustom({
      user_id: user_id,
    });

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
        </div>
      </PageLayout>
    );

  } catch(error) {
    return <div>Something went Wrong</div>
  }




  
};

export default NotSignedInProfile;
