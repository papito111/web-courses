import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (getAuth, req) => {
  const { userId } = await getAuth();
  if (!userId) {
    return new NextResponse("Unauthorizeed", { status: 401 });
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|api/stripe/webhook).*)", // 🚫 exclude webhook
    "/(api|trpc)(.*)",
  ],
};
