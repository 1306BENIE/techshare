import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // Routes protégées qui nécessitent une authentification
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/bookings") ||
    request.nextUrl.pathname.startsWith("/tools/new") ||
    request.nextUrl.pathname.startsWith("/profile");

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
  if (!token && isProtectedRoute) {
    const url = new URL("/auth/signin", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Si l'utilisateur est connecté et essaie d'accéder aux pages d'authentification
  if (
    token &&
    (request.nextUrl.pathname.startsWith("/auth/signin") ||
      request.nextUrl.pathname.startsWith("/auth/signup"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/bookings/:path*",
    "/tools/new",
    "/profile/:path*",
  ],
};
