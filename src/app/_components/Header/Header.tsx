"use client";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import User from "../../utils/user";
import { InputPost } from "./input";
import Loading from "./loading"
import { useEffect, useState } from "react";

export default function Header() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const imageUrl = User();

  useEffect(() => {
    if(isLoaded) {
      setLoading(false)
    }
  }, [isLoaded])

  if(loading) {
    return <Loading />
  }

  return (
    <div className="flex flex-col items-center">
      <div className="min-h-20 w-full border-x border-slate-400 bg-black md:max-w-screen-xl">
        {!isSignedIn && (
          <div className="flex min-h-20 justify-end border-b border-slate-400 p-4">
            <SignInButton />
          </div>
        )}
        {isSignedIn && (
          <div className="flex min-h-10 justify-between border-b border-slate-400 p-4">
            <div className="flex flex-row">
              <Image
                className="border-red rounded-[50%]"
                src={imageUrl}
                width={50}
                height={50}
                alt="profile picture"
              ></Image>
              <InputPost author_id={user.id}></InputPost>
            </div>
            <SignOutButton />
          </div>
        )}
      </div>
    </div>
  );
}
