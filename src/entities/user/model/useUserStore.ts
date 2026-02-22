import { create } from "zustand";
import { clearAccessToken, getAccessToken } from "@/shared/lib/auth";
import { apiClient } from "@/shared/api/apiClient";
import type { User, MypageResponse } from "./types";

interface UserState {
  user: User | null;
  isLoaded: boolean;
  fetchMyInfo: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoaded: false,

  fetchMyInfo: async () => {
    if (typeof window === "undefined") return;
    if (!getAccessToken()) {
      set({ user: null, isLoaded: true });
      return;
    }
    try {
      const { data } = await apiClient.get<MypageResponse>("/api/v1/users/mypage");
      set({
        user: {
          profileImageUrl: data.profileImageUrl,
          contextCategoryNames: data.contextCategoryNames ?? [],
        },
        isLoaded: true,
      });
    } catch {
      clearAccessToken();
      set({ user: null, isLoaded: true });
    }
  },

  setUser: (user) => set({ user }),

  logout: () => {
    clearAccessToken();
    set({ user: null });
  },
}));
