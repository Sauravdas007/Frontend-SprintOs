import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  
  // Get token from cookie
  const accessToken = req.cookies.get("accessToken")?.value;
  
  const isPublicRoute = ["/", "/login", "/register", "/features", "/pricing"].includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.startsWith("/api");

  // Allow API routes
  if (isApiRoute) {
    return NextResponse.next();
  }

  // If no token and trying to access protected route, redirect to login
  if (!accessToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // If has token and trying to access auth pages, redirect to dashboard
  if (accessToken && (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"]
};