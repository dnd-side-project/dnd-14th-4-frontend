const AUTH_ACCESS_TOKEN_KEY = "access_token";
const AUTH_ACCESS_TOKEN_COOKIE = "access_token";

const DEFAULT_COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 30; // 30일

function base64UrlToBase64(input: string) {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4 === 0 ? "" : "=".repeat(4 - (base64.length % 4));
  return base64 + pad;
}

function getJwtMaxAgeSeconds(token: string): number | null {
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const payloadJson =
      typeof window !== "undefined"
        ? window.atob(base64UrlToBase64(parts[1]))
        : null;
    if (!payloadJson) return null;
    const payload = JSON.parse(payloadJson) as { exp?: unknown };
    if (typeof payload.exp !== "number") return null;
    const diffSec = Math.floor(payload.exp - Date.now() / 1000);
    return diffSec > 0 ? diffSec : null;
  } catch {
    return null;
  }
}

function setAccessTokenCookie(token: string) {
  // middleware는 localStorage를 못 보므로 쿠키로도 동기화
  const encoded = encodeURIComponent(token);
  const isSecure = typeof window !== "undefined" && window.location.protocol === "https:";
  const secure = isSecure ? "; Secure" : "";
  const maxAge = getJwtMaxAgeSeconds(token) ?? DEFAULT_COOKIE_MAX_AGE_SEC;
  document.cookie = `${AUTH_ACCESS_TOKEN_COOKIE}=${encoded}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

function clearAccessTokenCookie() {
  const isSecure = typeof window !== "undefined" && window.location.protocol === "https:";
  const secure = isSecure ? "; Secure" : "";
  document.cookie = `${AUTH_ACCESS_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_ACCESS_TOKEN_KEY, token);
  setAccessTokenCookie(token);
}

export function syncAccessTokenCookie(): void {
  if (typeof window === "undefined") return;
  const token = getAccessToken();
  if (token) setAccessTokenCookie(token);
}

export function clearAccessToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_ACCESS_TOKEN_KEY);
  clearAccessTokenCookie();
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}
