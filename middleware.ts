// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (getAuth, req) => {
  // Jawne wykluczenie webhooka z middleware:
  if (req.nextUrl.pathname.startsWith("/api/stripe/webhook")) {
    return NextResponse.next();
  }

  // const { userId } = await getAuth();
  // if (!userId) {
  //   return new NextResponse("Unauthorizeed", { status: 401 });
  // }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // wszystko oprócz zasobów statycznych
  ],
};
