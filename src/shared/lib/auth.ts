const AUTH_ACCESS_TOKEN_KEY = "access_token";
const AUTH_ACCESS_TOKEN_COOKIE = "access_token";

function setAccessTokenCookie(token: string) {
  // middleware는 localStorage를 못 보므로 쿠키로도 동기화
  const encoded = encodeURIComponent(token);
  const isSecure = typeof window !== "undefined" && window.location.protocol === "https:";
  const secure = isSecure ? "; Secure" : "";
  document.cookie = `${AUTH_ACCESS_TOKEN_COOKIE}=${encoded}; Path=/; SameSite=Lax${secure}`;
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

export function clearAccessToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_ACCESS_TOKEN_KEY);
  clearAccessTokenCookie();
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}
