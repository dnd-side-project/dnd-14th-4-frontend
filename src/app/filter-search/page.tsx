"use client";

import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

export default function FilterSearchPage() {
  const router = useRouter();

  return (
    <div className="p-6">
      <header className="flex items-center gap-3 mb-4">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="뒤로가기"
          className="h-11 w-11 rounded-xl border border-neutral-200 bg-white grid place-items-center"
        >
          <FiChevronLeft className="h-5 w-5 text-neutral-700" />
        </button>

        <div>
          <h1 className="text-2xl font-bold">필터 검색</h1>
          <p className="text-gray-600 text-sm">
            조건을 선택해 원하는 상품을 찾아보세요.
          </p>
        </div>
      </header>

      <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-4 text-sm text-neutral-700">
        필터 검색 페이지 내용
      </div>
    </div>
  );
}
