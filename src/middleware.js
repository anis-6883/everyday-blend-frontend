import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("next-auth.session-token");
  const isSignInOrSignUpPath = ["signin", "signup"].some((path) =>
    request.nextUrl.pathname.includes(path),
  );

  if (!token && !isSignInOrSignUpPath) {
    return NextResponse.redirect(new URL("/user/signin", request.url));
  }

  if (token && isSignInOrSignUpPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
