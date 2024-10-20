import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// First, create a middleware.ts file in your project root
export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't need authentication
  const isPublicPath = path === "/login" || path === "/register";

  // Get the user ID or username from cookies
  const userId = request.cookies.get("token")?.value;

  // If user is on a public path and has a userId, redirect to dashboard
  if (isPublicPath && userId) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  // If user is not on a public path and doesn't have a userId, redirect to login
  if (!isPublicPath && !userId) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  return NextResponse.next();
}

// Configure the middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
