"use client";

import * as React from "react";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSearchPageTransition } from "@/features/search/transition";
import { POPULAR_KEYWORDS, RECENT_SEARCHES } from "@/features/search/model/mock";
import { useSearchState } from "@/widgets/search/model/useSearchState";
import { SearchHeader } from "@/widgets/search/ui/SearchHeader";
import { SearchResultSection } from "@/widgets/search/ui/SearchResultSection";
import { SearchLandingSection } from "@/widgets/search/ui/SearchLandingSection";

function SearchPageContent() {
  const router = useRouter();
  const { handleBack, inputRef } = useSearchPageTransition(router);

  const [query, setQuery] = React.useState("");
  const [recents, setRecents] = React.useState(RECENT_SEARCHES);
  const [selectedPopularId, setSelectedPopularId] =
    React.useState<string | null>(null);

  const {
    filteredPacks,
    hasIntent,
    isEmpty,
    recommendedPacks,
  } = useSearchState(query);

  const clearAll = () => setRecents([]);
  const removeOne = (id: string) =>
    setRecents((prev) => prev.filter((x) => x.id !== id));

  return (
    <main className="min-h-dvh bg-white pb-24">
      <SearchHeader
        query={query}
        onChange={setQuery}
        onBack={handleBack}
        onFilter={() => router.push("/filter-search")}
        inputRef={inputRef as React.RefObject<HTMLInputElement>}
      />

      {hasIntent ? (
        <SearchResultSection
          packs={filteredPacks}
          isEmpty={isEmpty}
          nickname="홍길동"
          recommended={recommendedPacks}
        />
      ) : (
        <SearchLandingSection
          recents={recents}
          onClear={clearAll}
          onRemove={removeOne}
          popular={POPULAR_KEYWORDS}
          selectedId={selectedPopularId}
          onSelectPopular={(value, id) => {
            setSelectedPopularId(id);
            router.push(`/search?categories=${value}`);
          }}
        />
      )}
    </main>
  );
}

function SearchPageFallback() {
  return (
    <main className="min-h-dvh bg-white pb-24 flex items-center justify-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-neutral-80 border-r-transparent" />
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageFallback />}>
      <SearchPageContent />
    </Suspense>
  );
}