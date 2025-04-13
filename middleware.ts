// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';

// // const isPublicRoute = createRouteMatcher(["/api/webhook"]);
// const isPublicRoute = createRouteMatcher([
//   "/api/stripe/webhook",
// ]);


// export default clerkMiddleware((auth, req) => {
//   if (!isPublicRoute(req)) {
//     const authResult = auth.protect();
//     if (authResult instanceof NextResponse) {
//       return authResult;
//     }
    
//   }
//   return NextResponse.next();
// });


// export const config = {
//   matcher: [
    
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     '/(api|trpc)(.*)',
//   ],
// };
