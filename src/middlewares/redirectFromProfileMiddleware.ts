import { type NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";

export function authMiddleware(request: NextRequest) {
//   const { userId } = auth();
const userId = "as"
//   if (userId) return NextResponse.redirect(new URL("/", request.url));
if(userId)
    console.log("AAAAAAAAAAA")

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*"],
};
