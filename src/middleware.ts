import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = new Set([
  "/login",
  "/login/success",
  "/intro",
  "/splash",
  "/_not-found",
]);

function isPublicPath(pathname: string) {
  if (PUBLIC_PATHS.has(pathname)) return true;
  // 정적 파일/서비스워커 등
  if (pathname.startsWith("/_next/")) return true;
  if (pathname.startsWith("/favicon")) return true;
  if (pathname === "/sw.js") return true;
  if (pathname === "/manifest.webmanifest") return true;
  if (pathname.startsWith("/icons/")) return true;
  return false;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublicPath(pathname)) return NextResponse.next();

  const tokenCookie = req.cookies.get("access_token")?.value;
  if (!tokenCookie) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/).*)"],
};

