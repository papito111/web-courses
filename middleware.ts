import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Lista tras publicznych (brak logowania)
const isPublicRoute = createRouteMatcher([
  "/",                    // strona główna
  "/courses(.*)",         // np. /courses, /courses/abc
  "/pricing",             // strona z cennikiem
  "/api/stripe/webhook",  // webhook Stripe — musi zostać!
]);

export default clerkMiddleware(async (getAuth, req) => {
  // Jeśli trasa jest publiczna — przepuść
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  const { userId } = await getAuth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // wyklucza pliki statyczne + stripe webhook
  ],
};
