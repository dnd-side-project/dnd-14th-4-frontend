"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAccessToken } from "@/shared/lib/auth";
import { useUserStore } from "@/entities/user/model";

export function AuthHydrate({ children }: { children: React.ReactNode }) {
  const fetchMyInfo = useUserStore((s) => s.fetchMyInfo);
  const isLoaded = useUserStore((s) => s.isLoaded);
  const user = useUserStore((s) => s.user);
  const router = useRouter();
  const pathname = usePathname();

  const isPublicPath =
    pathname === "/login" ||
    pathname === "/login/success" ||
    pathname === "/intro" ||
    pathname === "/splash";

  useEffect(() => {
    if (getAccessToken() && !isLoaded) {
      fetchMyInfo();
    } else if (!getAccessToken()) {
      useUserStore.setState({ user: null, isLoaded: true });
      if (!isPublicPath) router.replace("/login");
    }
  }, [fetchMyInfo, isLoaded, isPublicPath, router]);

  useEffect(() => {
    // 토큰은 있는데 유저 조회 결과가 없으면(만료/실패 등) 로그인으로
    if (!isPublicPath && isLoaded && getAccessToken() && !user) {
      router.replace("/login");
    }
  }, [isLoaded, isPublicPath, router, user]);

  return <>{children}</>;
}
