"use client";

import { useEffect } from "react";
import { getAccessToken } from "@/shared/lib/auth";
import { useUserStore } from "@/entities/user/model";

export function AuthHydrate({ children }: { children: React.ReactNode }) {
  const fetchMyInfo = useUserStore((s) => s.fetchMyInfo);
  const isLoaded = useUserStore((s) => s.isLoaded);

  useEffect(() => {
    if (getAccessToken() && !isLoaded) {
      fetchMyInfo();
    } else if (!getAccessToken()) {
      useUserStore.setState({ user: null, isLoaded: true });
    }
  }, [fetchMyInfo, isLoaded]);

  return <>{children}</>;
}
