"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSearchTransitionContext } from "@/features/search/transition/SearchTransitionContext";
import { SearchInput } from "@/features/search/ui/SearchInput";
import IcFilter from "@/shared/icons/ic_filter";

type Props = {
  onSearchBarClick?: () => void;
  onFilterClick?: () => void;
};

export function HomeSearchHeader({ onSearchBarClick, onFilterClick }: Props) {
  const router = useRouter();
  const { setFromHome } = useSearchTransitionContext();

  const goSearchPage = useCallback(
    (q: string) => {
      if (onSearchBarClick) {
        onSearchBarClick();
        return;
      }

      setFromHome(true);
      router.push(`/search?q=${encodeURIComponent(q)}`, { scroll: false });
    },
    [router, onSearchBarClick, setFromHome]
  );

  const goFilterSearchPage = useCallback(() => {
    if (onFilterClick) {
      onFilterClick();
      return;
    }
    router.push("/filter-search", { scroll: false });
  }, [router, onFilterClick]);

  return (
    <section>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <SearchInput
            isSearchMode={false}
            query=""
            onChange={() => {}}
            onSearch={goSearchPage}
          />
        </div>

        <button
          type="button"
          onClick={goFilterSearchPage}
          className="h-6 w-6 shrink-0 rounded-xl flex items-center justify-center"
          aria-label="필터 검색"
        >
          <IcFilter />
        </button>
      </div>
    </section>
  );
}