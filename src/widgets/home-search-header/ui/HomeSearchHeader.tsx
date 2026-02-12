"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/features/search/ui/SearchInput";

export function HomeSearchHeader() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const goSearchPage = React.useCallback(() => {
    router.push("/search", { scroll: false });
  }, [router]);

  return (
    <section className="mt-10">
      <SearchInput
        isSearchMode={false}
        query={query}
        onChange={setQuery}
        onEnterSearchMode={goSearchPage} // ✅ 클릭/포커스 시 여기 호출되게
      />
    </section>
  );
}
