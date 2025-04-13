import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/api/stripe/webhook", // publiczny webhook Stripe
]);

export default clerkMiddleware(async (auth, req) => {
  // pozwól Stripe wejść bez auth
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // awaitujemy obiekt auth
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // pomijaj pliki statyczne
    "/(api|trpc)(.*)",        // obejmuj wszystkie API i trpc
  ],
};
