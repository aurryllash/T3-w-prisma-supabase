import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/profile(.*)'])

export default clerkMiddleware((auth, req) => {
  console.log('Middleware running')
  if(isProtectedRoute(req)) {
    const user = auth().userId
    if (!user) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
});



export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
