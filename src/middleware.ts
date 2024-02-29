import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";
import { routes } from "./config/routes";

interface IAllowedPaths {
  [key: string]: string[];
}

const allowedPaths: IAllowedPaths = {
  admin: [routes.admin.dashboard]
};

const isAuthorized = (role: string, path: string): boolean => {
  const roleAllowedPaths = allowedPaths[role];
  return roleAllowedPaths ? roleAllowedPaths.includes(path) : false;
};

export default withAuth(
  function middleware(req) {
    const userRole = req.nextauth.token?.role as string;
    const pathname = req.nextUrl.pathname as string;

    // console.log("Pathname: ", pathname);
    // console.log("UserRole: ", userRole);
    // console.log("isAuthorized: ", isAuthorized(userRole, pathname));

    if (!isAuthorized(userRole, pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => true
    }
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|icons|favicon.ico|login|admin/login|$).*)"]
};
