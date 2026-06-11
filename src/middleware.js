import { NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/login",
  "/create-account",
  "/verify",
  "/", // allow homepage if needed
];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  const isPublic = PUBLIC_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  const session = req.cookies.get("session_id");

  // Not logged in -> redirect
  if (!session && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Logged in -> prevent going back to login
  if (session && (pathname === "/login" || pathname === "/verify")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|images).*)",
  ],
};
