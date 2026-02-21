"use client";

import * as React from "react";
import { FiSearch } from "react-icons/fi";

type Props = {
  isSearchMode?: boolean;
  query: string;
  onChange: (v: string) => void;
  onEnterSearchMode?: () => void; // 검색 페이지 이동
};

const barClass =
  "flex h-11 items-center gap-2 rounded-xl bg-neutral-100 px-3 transition-all duration-300";
const placeholderClass =
  "text-sm text-neutral-400";

export function SearchInput({
  isSearchMode = false,
  query,
  onChange,
  onEnterSearchMode,
}: Props) {
  const handleEnterSearch = () => {
    if (!isSearchMode) onEnterSearchMode?.();
  };

  if (!isSearchMode) {
    return (
      <button
        type="button"
        onClick={handleEnterSearch}
        className={`${barClass} w-full cursor-pointer text-left`}
        aria-label="검색 페이지로 이동"
      >
        <FiSearch className="h-5 w-5 shrink-0 text-neutral-400" />
        <span className={placeholderClass}>다양한 팩을 검색해보세요.</span>
      </button>
    );
  }

  return (
    <div className={barClass}>
      <FiSearch className="h-5 w-5 shrink-0 text-neutral-400" />
      <input
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnterSearchMode?.()}
        placeholder="다양한 팩을 검색해보세요."
        className="h-full w-full bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
      />
    </div>
  );
}
