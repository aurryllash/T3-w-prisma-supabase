"use client";

import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import User from "../utils/user";
import { InputPost } from "./input";

export default function Header() {
  const { user,  isSignedIn, isLoaded } = useUser();
  const imageUrl = User();
  console.log(user)

  return (
    <div>
      <div>
        {!isSignedIn && <SignInButton />}
        {isSignedIn && (
          <div className="flex justify-between w-full border-b p-4">
            <div className="flex gap-3">
              <Image
                className="border-red rounded-lg bg-white"
                src={imageUrl}
                width={50}
                height={50}
                alt="profile picture"
              ></Image>
              {/* <input className="border-none bg-transparent focus:border-none outline-none" type="text" placeholder="Type some post..." /> */}
              <InputPost></InputPost>
            </div>
            <SignOutButton />
          </div>
        )}
      </div>
    </div>
  );
}
