"use client";

import * as React from "react";
import { Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSearchPageTransition } from "@/features/search/transition";
import { POPULAR_KEYWORDS, RECENT_SEARCHES } from "@/features/search/model/mock";
import { categoriesToQuery, slugToLabel } from "@/features/search/model/categories";
import { useSearchState } from "@/widgets/search/model/useSearchState";
import { SearchHeader } from "@/widgets/search/ui/SearchHeader";
import { SearchResultSection } from "@/widgets/search/ui/SearchResultSection";
import { SearchLandingSection } from "@/widgets/search/ui/SearchLandingSection";
import { CategoryChip } from "@/shared/ui/CategoryChip";

function SearchPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const { handleBack, inputRef } = useSearchPageTransition(router);

  const [query, setQuery] = React.useState("");
  const [recents, setRecents] = React.useState(RECENT_SEARCHES);
  const [selectedPopularId, setSelectedPopularId] =
    React.useState<string | null>(null);

  const {
    categorySlugs,
    selectedLabels,
    filteredPacks,
    hasIntent,
    isEmpty,
    recommendedPacks,
  } = useSearchState(query);

  const clearAll = () => setRecents([]);
  const removeOne = (id: string) =>
    setRecents((prev) => prev.filter((x) => x.id !== id));

  const removeCategory = (slug: string) => {
    const nextSlugs = categorySlugs.filter((s) => s !== slug);
    const q = categoriesToQuery(nextSlugs);
    router.replace(q ? `${pathname}?categories=${q}` : pathname);
  };

  return (
    <main className="min-h-dvh bg-white pb-24">
      <SearchHeader
        query={query}
        onChange={setQuery}
        onBack={handleBack}
        onFilter={() => router.push("/filter-search")}
        inputRef={inputRef as React.RefObject<HTMLInputElement>}
      />

      {hasIntent && selectedLabels.length > 0 ? (
        <section className="px-4 pt-3 pb-2 border-b border-neutral-95">
          <div className="flex flex-wrap gap-2">
            {categorySlugs.map((slug) => {
              const label = slugToLabel(slug);
              if (!label) return null;
              return (
                <CategoryChip
                  key={slug}
                  label={label}
                  onRemove={() => removeCategory(slug)}
                />
              );
            })}
          </div>
        </section>
      ) : null}

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