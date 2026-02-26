"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IcSvgLogo } from "@/shared/icons";
import { SPLASH_DURATION_MS } from "../model/constants";

export function SplashPage() {
  const router = useRouter();
  //TODO: 로그인 여부 확인 후 이동
  useEffect(() => {
    const t = setTimeout(() => {
      router.replace("/intro");
    }, SPLASH_DURATION_MS);
  
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/splash-bg.png')" }} 
    >
      <IcSvgLogo className="w-30 h-30" />
    </div>
  );
}