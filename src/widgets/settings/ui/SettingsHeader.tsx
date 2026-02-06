"use client";

import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

export function SettingsHeader() {
  const router = useRouter();

  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={() => router.back()}
        className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-100"
        aria-label="뒤로가기"
      >
        <FiChevronLeft className="text-2xl" />
      </button>

      <h1 className="text-xl font-semibold">설정</h1>
    </div>
  );
}
