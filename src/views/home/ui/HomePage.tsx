"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  SearchBarOverlay,
  useSearchBarTransition,
} from "@/features/search/transition";
import { HomeSearchHeader } from "@/widgets/home-search-header/ui/HomeSearchHeader";

export function HomePage() {
  const router = useRouter();
  const {
    searchBarRef,
    titleVisible,
    titleTransition,
    forwardOverlay,
    returnOverlay,
    startTransition,
    transitionConfig,
  } = useSearchBarTransition(router);

  return (
    <div className="p-6">
      <motion.div
        initial={false}
        animate={{
          opacity: titleVisible ? 1 : 0,
          y: titleVisible ? 0 : -8,
        }}
        transition={titleTransition}
        className="mb-2"
      >
        <h1 className="text-2xl font-bold text-neutral-900">홈</h1>
        <p className="text-gray-600">추천 상품들을 확인해보세요.</p>
      </motion.div>

      <div ref={searchBarRef} className="mt-10">
        <HomeSearchHeader onSearchBarClick={startTransition} />
      </div>

      <SearchBarOverlay
        forward={forwardOverlay}
        return={returnOverlay}
        config={transitionConfig}
      />
    </div>
  );
}
