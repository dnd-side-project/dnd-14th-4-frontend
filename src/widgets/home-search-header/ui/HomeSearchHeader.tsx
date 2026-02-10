"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

import { useSearchMode } from "@/features/search/model/useSearchMode";
import { SearchInput } from "@/features/search/ui/SearchInput";
import { PreSearchBottom } from "@/features/search/ui/PreSearchBottom";
import { SearchBottom } from "@/features/search/ui/SearchBottom";

type Props = {
  onSearchModeChange?: (v: boolean) => void;
};

export function HomeSearchHeader({ onSearchModeChange }: Props) {
  const router = useRouter();
  const { isSearchMode, enter, exit } = useSearchMode();
  const [query, setQuery] = useState("");

  const enterWithNotify = React.useCallback(() => {
    enter();
    onSearchModeChange?.(true);
  }, [enter, onSearchModeChange]);
  const exitWithNotify = React.useCallback(() => {
    exit();
    onSearchModeChange?.(false);
  }, [exit, onSearchModeChange]);
  return (
    <section
      className={`transition-all duration-300 ease-out ${
        isSearchMode ? "mt-2" : "mt-10"
      }`}
    >
      <div className="flex items-center gap-2 transition-all duration-300 ease-out">
        {/* 뒤로가기: 검색모드에서만 */}
        <button
          type="button"
          onClick={exitWithNotify}
          aria-label="뒤로가기"
          className={`h-11 rounded-xl border bg-white grid place-items-center overflow-hidden transition-all duration-300 ease-out
          ${
            isSearchMode
              ? "w-11 opacity-100 scale-100 border-neutral-200"
              : "w-0 opacity-0 scale-95 border-transparent p-0"
          }`}
        >
          <FiChevronLeft className="h-5 w-5 text-neutral-700" />
        </button>

        <div className="flex-1">
          <SearchInput
            isSearchMode={isSearchMode}
            query={query}
            onChange={setQuery}
            onEnterSearchMode={enterWithNotify}
          />
        </div>

        {/* 필터: 다른 페이지로 이동 */}
        <button
          type="button"
          onClick={() => router.push("/filter-search")}
          className="h-11 rounded-xl border border-neutral-200 bg-white px-4 flex items-center gap-2"
        >
          <span className="text-sm text-neutral-800">필터</span>
        </button>
      </div>

      {isSearchMode ? <SearchBottom /> : <PreSearchBottom />}
    </section>
  );
}
