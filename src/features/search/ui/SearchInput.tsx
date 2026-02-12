"use client";

import * as React from "react";
import { FiSearch } from "react-icons/fi";

type Props = {
  isSearchMode?: boolean;
  query: string;
  onChange: (v: string) => void;
  onEnterSearchMode?: () => void; // 검색 페이지 이동
};

export function SearchInput({
  isSearchMode = false,
  query,
  onChange,
  onEnterSearchMode,
}: Props) {
  const handleFocus = () => {
    if (!isSearchMode) {
      onEnterSearchMode?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnterSearchMode?.();
    }
  };

  return (
    <div
      className={`flex h-11 items-center gap-2 rounded-xl px-3 transition-all duration-300 ${
        isSearchMode ? "bg-neutral-100" : "bg-neutral-100"
      }`}
      onClick={handleFocus}
    >
      <FiSearch className="h-5 w-5 text-neutral-400" />

      <input
        value={query}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder="다양한 팩을 검색해보세요."
        className="h-full w-full bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
      />
    </div>
  );
}
