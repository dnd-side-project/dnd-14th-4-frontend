"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IcSvgLogo } from "@/shared/icons";
import { SPLASH_DURATION_MS } from "../model/constants";
export function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace("/login");
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="w-full flex justify-center">
      <div
        className="
          relative
          w-full
          max-w-mobile
          min-h-dvh
          flex items-center justify-center
          bg-cover bg-center bg-no-repeat
          bg-splash
        "
      >
        <IcSvgLogo className="w-30 h-30" />
      </div>
    </div>
  );
}