import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/register";
  const userId = request.cookies.get("token")?.value;

  // If user is on a public path and has a userId
  if (isPublicPath && userId) {
    // Check if there's a stored return URL in the searchParams
    const returnTo = request.nextUrl.searchParams.get('returnTo');
    if (returnTo) {
      // Redirect to the stored URL
      return NextResponse.redirect(new URL(returnTo, request.nextUrl));
    }
    // Default redirect to home if no stored URL
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // If user is not on a public path and doesn't have a userId
  if (!isPublicPath && !userId) {
    // Create the login URL with the current path as returnTo parameter
    const loginUrl = new URL('/login', request.nextUrl);
    loginUrl.searchParams.set('returnTo', request.nextUrl.pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};