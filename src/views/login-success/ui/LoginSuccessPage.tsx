"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { setAccessToken } from "@/shared/lib/auth";
import { useUserStore } from "@/entities/user/model/useUserStore";
import Loading from "@/shared/ui/Loading";

export const LoginSuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const didHandle = useRef(false);
  const fetchMyInfo = useUserStore((s) => s.fetchMyInfo);

  const accessToken = searchParams.get("access_token");

  useEffect(() => {
    if (didHandle.current) return;
    if (accessToken) {
      didHandle.current = true;
      setAccessToken(accessToken);
      (async () => {
        await fetchMyInfo();
        const { needsOnboarding } = useUserStore.getState();
        router.replace(needsOnboarding ? "/onboarding" : "/");
      })().catch(() => {
        router.replace("/");
      });
    }
  }, [accessToken, fetchMyInfo, router]);

  if (!accessToken) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-6">
        <p className="text-red-600 font-medium">로그인에 실패했습니다.</p>
        <p className="mt-2 text-sm text-gray-500">
          토큰을 받지 못했습니다. 다시 로그인해 주세요.
        </p>
        <a href="/login" className="mt-6 text-blue-600 underline hover:no-underline">
          로그인 페이지로 이동
        </a>
      </div>
    );
  }

  return <Loading />;
};