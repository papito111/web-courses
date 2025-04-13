import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Definiujemy trasę webhooka Stripe jako publiczną
const isPublicRoute = createRouteMatcher(["/api/stripe/webhook"]);

export default clerkMiddleware(async (auth, req) => {
  // Jeśli trasa jest publiczna, przepuszczamy bez autoryzacji
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Wywołujemy funkcję auth i oczekujemy na wynik
  const { userId } = await auth();

  // Jeśli użytkownik nie jest zalogowany, zwracamy 401
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Jeśli użytkownik jest zalogowany, przepuszczamy dalej
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Pomijamy pliki statyczne
    "/((?!_next|.*\\..*).*)",
    // Obejmuje wszystkie trasy API
    "/(api|trpc)(.*)",
  ],
};
