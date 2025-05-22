import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Gestion des CORS pour les routes API
  if (request.nextUrl.pathname.startsWith("/api")) {
    const response = NextResponse.next();

    // Autoriser les requêtes depuis n'importe quelle origine en développement
    const origin = request.headers.get("origin") || "*";
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");

    // Gérer les requêtes OPTIONS (pre-flight)
    if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 204 });
    }

    return response;
  }

  // Vérification de l'authentification pour les routes protégées
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  if (!token && !isAuthPage) {
    const url = new URL("/auth/signin", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  if (token && isAuthPage) {
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
    "/api/:path*",
  ],
};
