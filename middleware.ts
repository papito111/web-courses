import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// const isPublicRoute = createRouteMatcher(["/api/webhook"]);
const isPublicRoute = createRouteMatcher([
  "/api/stripe/webhook",
  // "/api/webhook", // jeśli używasz też innych
]);


export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    const authResult = auth.protect();
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    // Obsłuż przypadek, gdy authResult nie jest NextResponse
    // Na przykład, możesz przekierować użytkownika lub zwrócić błąd
  }
  return NextResponse.next();
});


export const config = {
  matcher: [
    
    // Pomijaj wewnętrzne pliki Next.js i wszystkie pliki statyczne, chyba że są w parametrach wyszukiwania
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Zawsze uruchamiaj dla tras API
    '/(api|trpc)(.*)',
  ],
};
