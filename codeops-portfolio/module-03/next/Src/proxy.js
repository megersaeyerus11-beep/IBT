import { NextResponse } from "next/server";

export function proxy(request) {
  const sessionCookie = request.cookies.get("session")?.value;

  // Proxy is an early redirect check, not the full session/permission check.
  if (!sessionCookie) {
    const signInUrl = new URL("/signin", request.url);

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
