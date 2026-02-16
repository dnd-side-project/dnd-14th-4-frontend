"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSearchTransitionContext } from "@/features/search/transition/SearchTransitionContext";
import { SearchInput } from "@/features/search/ui/SearchInput";

type Props = {
  /** 홈에서 클릭 시 전환 애니메이션을 위해 호출. 있으면 router.push 대신 이걸 호출 */
  onSearchBarClick?: () => void;
};

export function HomeSearchHeader({ onSearchBarClick }: Props) {
  const router = useRouter();
  const { setFromHome } = useSearchTransitionContext();

  const goSearchPage = useCallback(() => {
    if (onSearchBarClick) {
      onSearchBarClick();
      return;
    }
    setFromHome(true);
    router.push("/search", { scroll: false });
  }, [router, onSearchBarClick, setFromHome]);

  return (
    <section>
      <SearchInput
        isSearchMode={false}
        query=""
        onChange={() => {}}
        onEnterSearchMode={goSearchPage}
      />
    </section>
  );
}
