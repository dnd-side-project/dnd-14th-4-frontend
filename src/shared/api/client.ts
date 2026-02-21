const getBaseUrl = () => {
    if (typeof window === "undefined") return "";
    return process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
};

/** 로그인 후 저장된 토큰. 테스트 시 localStorage에 accessToken = "user_1" 또는 "user_2" 저장하면 Bearer 인증으로 사용됨 */
const getAccessToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken");
};

export type RequestConfig = RequestInit & {
    /** true면 Authorization 헤더를 붙이지 않음 */
    skipAuth?: boolean;
};

export async function apiClient<T>(path: string, config: RequestConfig = {}): Promise<T> {
    const { skipAuth, ...init } = config;
    const baseUrl = getBaseUrl().replace(/\/$/, "");
    const url = path.startsWith("http") ? path : `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

    const headers = new Headers(init.headers);

    if (!skipAuth) {
        const token = getAccessToken();
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
    }

    const res = await fetch(url, {
        ...init,
        headers,
    });

    if (!res.ok) {
        const text = await res.text();
        let message = text;
        try {
            const json = JSON.parse(text) as { message?: string };
            if (json.message) message = json.message;
        } catch {
            // ignore
        }
        throw new Error(message || `API Error ${res.status}`);
    }

    if (res.status === 204) {
        return undefined as T;
    }

    return res.json() as Promise<T>;
}

export { getBaseUrl, getAccessToken };
