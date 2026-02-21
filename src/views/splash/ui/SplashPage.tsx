"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IcSvgLogo } from "@/shared/icons";
import { useAuthStore } from "@/shared/store/authStore";
import { SPLASH_DURATION_MS } from "../model/constants";

export function SplashPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    const t = setTimeout(() => {
      if (isAuthenticated) {
        router.replace("/");
      } else {
        router.replace("/login");
      }
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(t);
  }, [router, isAuthenticated]);

  return (
    <div className="fixed inset-0 z-[100] flex min-h-dvh flex-col items-center justify-center bg-white">
      <IcSvgLogo width={120} height={120} className="shrink-0" />
      <p className="mt-4 type-heading2 text-label-default">
        What&apos;s in my pack
      </p>
    </div>
  );
}
