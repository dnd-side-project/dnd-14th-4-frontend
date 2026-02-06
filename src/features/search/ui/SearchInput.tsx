"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  isSearchMode: boolean;
  query: string;
  onChange: (v: string) => void;
  onEnterSearchMode: () => void;
};

export function SearchInput({
  isSearchMode,
  query,
  onChange,
  onEnterSearchMode,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSearchMode) return;
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [isSearchMode]);

  return (
    <div className="h-11 rounded-xl border border-neutral-200 bg-white flex items-center transition-all duration-300 ease-out px-3">
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder={isSearchMode ? "검색어를 입력하세요" : "상품 검색"}
        className="w-full outline-none text-sm"
        onFocus={onEnterSearchMode}
      />
    </div>
  );
}
