import { api, HydrateClient } from "~/trpc/server";
// import { SignIn, SignInButton, useUser } from "@clerk/nextjs";
import SignInComp from "./_components/SignIn";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div>
          {/* <SignInButton /> */}
          <SignInComp />
        </div>
        {/* <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" /> */}
      </main>
    </HydrateClient>
  );
}
