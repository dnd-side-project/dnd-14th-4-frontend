"use client";

import { useRouter } from "next/navigation";
import { FiSettings } from "react-icons/fi";
import { ROUTES } from "@/shared/constants/routes";

export function MyPageHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold">마이페이지</h1>

      <button
        onClick={() => router.push(ROUTES.SETTINGS)}
        className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-100"   >
        <FiSettings className="text-xl" />
      </button>
    </div>
  );
}
