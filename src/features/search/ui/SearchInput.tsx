"use client";

import * as React from "react";
import { FiSearch } from "react-icons/fi";

type Props = {
  isSearchMode?: boolean;
  query: string;
  onChange: (v: string) => void;
  onEnter?: () => void;
  onSearch?: (q: string) => void;
};

const barClass =
  "flex h-10 items-center border border-pink-50 gap-2 rounded-xl bg-common-0 px-3 transition-all duration-300";
const placeholderClass = "text-sm text-neutral-400 dark:text-neutral-400";

export function SearchInput({
  isSearchMode = false,
  query,
  onChange,
  onEnter,
  onSearch,
}: Props) {
  if (!isSearchMode) {
    return (
      <button
        type="button"
        onClick={() => onSearch?.(query)}
        className={`${barClass} w-full cursor-pointer text-left`}
        aria-label="검색 페이지로 이동"
      >
        <FiSearch className="h-5 w-5 shrink-0 text-pink-50" />
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter?.();
            onSearch?.(query);
          }
        }}
        placeholder="다양한 팩을 검색해보세요."
        className="h-full w-full bg-transparent text-sm text-neutral-800 dark:text-neutral-800 outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-400"
      />
    </div>
  );
}