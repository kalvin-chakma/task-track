import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === "/signin" || path === "/signup";

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value || "";

  // Redirect logic
  if (isPublicPath && token) {
    // If user is logged in and tries to access signin/signup page
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !token) {
    // If user is not logged in and tries to access protected page
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/", "/signin", "/signup", "/api/tasks/:path*"],
};
