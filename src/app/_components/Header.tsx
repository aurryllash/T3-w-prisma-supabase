"use client";

import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import User from "../utils/user";
import { InputPost } from "./input";

export default function Header() {
  const { user,  isSignedIn, isLoaded } = useUser();
  const imageUrl = User();

  return (
    <div className="flex flex-col items-center">
      <div className="w-full md:max-w-screen-xl  border-x">
        {!isSignedIn && <SignInButton />}
        {isSignedIn && (
          <div className="flex justify-between w-full border-b border-slate-400 p-4">
            <div className="flex gap-3">
              <Image
                className="border-red rounded-lg bg-white"
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
