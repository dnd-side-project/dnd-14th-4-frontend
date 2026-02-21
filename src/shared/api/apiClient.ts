import axios, { type AxiosInstance } from "axios";
import { getAccessToken } from "@/shared/lib/auth";

const baseURL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;
  }
  return config;
});

/**
 * 제네릭으로 응답 타입 지정해서 사용
 * @example
 * const { data } = await apiClient.get<MypageResponse>("/api/v1/users/mypage");
 * // data는 MypageResponse 타입
 */
export default apiClient;
