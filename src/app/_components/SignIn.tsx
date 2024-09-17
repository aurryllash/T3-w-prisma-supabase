// "use client"

import { SignIn, SignInButton, useUser } from "@clerk/nextjs";

export default function SignInComp() {
//   const { user } = useUser();

//   console.log('user: ', user)
  return (
    <div>
      <div>
        <SignInButton />
      </div>
      {/* <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up"/> */}
    </div>
  );
}
