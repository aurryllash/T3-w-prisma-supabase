"use client";

import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function SignInComp() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <div>
      <div>
        {!isSignedIn && <SignInButton />}
        {isSignedIn && <SignOutButton />}
      </div>
    </div>
  );
}
