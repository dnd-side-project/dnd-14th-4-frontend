import { create } from "zustand";
import { clearAccessToken, getAccessToken } from "@/shared/lib/auth";
import { apiClient } from "@/shared/api/apiClient";
import type { User, MypageResponse } from "./types";

interface UserState {
  user: User | null;
  isLoaded: boolean;
  needsOnboarding: boolean;
  fetchMyInfo: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoaded: false,
  needsOnboarding: false,

  fetchMyInfo: async () => {
    if (typeof window === "undefined") return;
    if (!getAccessToken()) {
      set({ user: null, isLoaded: true, needsOnboarding: false });
      return;
    }
    try {
      const { data } = await apiClient.get<MypageResponse>("/api/v1/users/mypage");

      const name = (data?.name ?? "").trim();
      const age = (data?.age ?? "").trim();
      const gender = (data?.gender ?? "").trim();
      const contextCategoryNames = Array.isArray(data?.contextCategoryNames)
        ? data.contextCategoryNames
        : [];

      // 백엔드에서 신규유저 플래그를 못 받는 경우: "온보딩 완료 여부"를 프로필/관심사 채움 여부로 추정
      const needsOnboarding =
        !name || !age || !gender || contextCategoryNames.length === 0;

      set({
        user: {
          name,
          profileImageUrl: data?.profileImageUrl ?? "",
          contextCategoryNames,
          age,
          gender,
        },
        isLoaded: true,
        needsOnboarding,
      });
    } catch {
      clearAccessToken();
      set({ user: null, isLoaded: true, needsOnboarding: false });
    }
  },

  setUser: (user) => set({ user }),

  logout: () => {
    clearAccessToken();
    set({ user: null });
  },
}));
