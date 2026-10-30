
import { NextResponse } from "next/server";

export function middleware(request) {
  const session = request.cookies.get("session")?.value;

  if (!session) {
    const signInUrl = new URL("/signin", request.url);

    // Preserve the intended destination, including its query string.
    signInUrl.searchParams.set(
      "next",
      request.nextUrl.pathname + request.nextUrl.search
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*"],
};
