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

  // 정적 파일 (확장자가 있는 파일), 서비스워커 등
  const isStaticFile = pathname.includes(".");
  const isNextInternal = pathname.startsWith("/_next/");
  const isPublicAsset =
    pathname.startsWith("/icons/") ||
    pathname.startsWith("/background/") ||
    pathname.startsWith("/images/");

  if (isStaticFile || isNextInternal || isPublicAsset) return true;

  if (pathname === "/sw.js" || pathname === "/manifest.webmanifest") return true;

  return false;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublicPath(pathname)) return NextResponse.next();

  const tokenCookie = req.cookies.get("access_token")?.value;
  if (!tokenCookie) {
    // 잠시 풀어두기 위해 리다이렉트 로직을 주석 처리합니다.
    // const url = req.nextUrl.clone();
    // url.pathname = "/login";
    // url.search = "";
    // return NextResponse.redirect(url);
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/).*)"],
};
