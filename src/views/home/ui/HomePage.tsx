"use client";

import { useState } from "react";
import { HomeSearchHeader } from "@/widgets/home-search-header/ui/HomeSearchHeader";
import { ItemBox } from "@/shared/ui/item/ItemBox";
import { MOCK_ITEMS } from "@/features/search/model/mock";

export function HomePage() {
  const [hideIntro] = useState(false);

  return (
    <div className="p-6">
      {!hideIntro && (
        <>
          <h1 className="text-2xl font-bold mb-2">홈</h1>
          <p className="text-gray-600">추천 상품들을 확인해보세요.</p>
        </>
      )}

      <HomeSearchHeader />
      <ItemBox item={MOCK_ITEMS[0]} />
    </div>
  );
}
