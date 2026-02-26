"use client";

import React from "react";
import { useRouter } from "next/navigation";

export function IntroPage() {
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col justify-end bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background/bg-intro.png')" }}
    >
      <section className="px-6 pb-[140px]">
        <p className="text-center type-headline2 text-neutral-800/90">
          따로 찾지 말고, 한 번에 팩으로
        </p>

        <h1 className="mt-2 text-center text-[26px] leading-[34px] font-extrabold text-neutral-900">
          실패 없는 소비를 위한
          <br />
          애착템 공유 플랫폼
        </h1>
      </section>

      <div className="px-5 pb-[max(env(safe-area-inset-bottom),24px)]">
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="h-14 w-full rounded-full bg-black text-white text-[16px] font-semibold active:scale-[0.98] transition"
        >
          시작하기
        </button>
      </div>
    </div>
  );
}