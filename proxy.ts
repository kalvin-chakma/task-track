import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/app/lib/getUser";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const userId = token ? getUserFromToken(token) : null;

  if (!userId) {
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user-id", userId);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/home/:path*", "/api/tasks/:path*", "/api/boards/:path*"],
};
