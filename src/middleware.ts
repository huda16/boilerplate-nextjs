// export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// export const config = { matcher: ["/dashboard"] };

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;
  if (!session && pathname === "/") {
    return NextResponse.redirect(process.env.NEXTAUTH_URL + "/signin");
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/signin",
    "/signup",
  ],
};
