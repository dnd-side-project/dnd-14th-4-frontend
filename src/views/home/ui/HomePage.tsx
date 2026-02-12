"use client";

import { useState } from "react";
import { HomeSearchHeader } from "@/widgets/home-search-header/ui/HomeSearchHeader";
import TextBtn from "@/shared/ui/TextBtn";

export function HomePage() {
  const [hideIntro, setHideIntro] = useState(false);

  return (
    <div className="p-6">
      {!hideIntro && (
        <>
          <h1 className="text-2xl font-bold mb-2">홈</h1>
          <p className="text-gray-600">추천 상품들을 확인해보세요.</p>
        </>
      )}

      <HomeSearchHeader onSearchModeChange={setHideIntro} />

    </div>
  );
}
