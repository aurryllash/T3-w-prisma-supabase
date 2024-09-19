"use client";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import User from "../utils/user";
import { InputPost } from "./input";

export default function Header() {
  const { user,  isSignedIn, isLoaded } = useUser();
  const imageUrl = User();

  return (
    <div className="flex flex-col items-center">
      <div className="w-full md:max-w-screen-xl border-x min-h-20 bg-black">
        <div className="flex justify-end">
        {!isSignedIn && <SignInButton />}
        </div>
        {isSignedIn && (
          <div className="flex justify-between border-b border-slate-400 p-4  min-h-10">
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
