"use client";

import * as React from "react";
import { Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSearchPageTransition } from "@/features/search/transition";
import {
  categoriesToQuery,
  labelToSlug,
  slugToLabel,
} from "@/features/search/model/categories";
import { useSearchState } from "@/widgets/search/model/useSearchState";
import { SearchHeader } from "@/widgets/search/ui/SearchHeader";
import { SearchResultSection } from "@/widgets/search/ui/SearchResultSection";
import { SearchLandingSection } from "@/widgets/search/ui/SearchLandingSection";
import { CategoryChip } from "@/shared/ui/CategoryChip";
import { useUserStore } from "@/entities/user/model/useUserStore";
import { usePopularKeywords } from "@/features/search/model/usePopularKeywords";
import { useRecentSearches } from "@/features/search/model/useRecentSearches";

function SearchPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = React.useMemo(() => searchParams.toString(), [searchParams]);
  const { handleBack, inputRef } = useSearchPageTransition(router);

  const [query, setQuery] = React.useState("");
  const [selectedPopularId, setSelectedPopularId] =
    React.useState<string | null>(null);
  const user = useUserStore((state) => state.user);
  const { data: popularKeywords = [] } = usePopularKeywords();
  const { recents, add: addRecent, remove: removeRecent, clear: clearRecents } =
    useRecentSearches();
  const {
    categorySlugs,
    selectedLabels,
    filteredPacks,
    hasIntent,
    isEmpty,
    recommendedPacks,
  } = useSearchState(query);

  React.useEffect(() => {
    // /search 진입(또는 쿼리 변경) 시 항상 맨 위에서 시작
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, searchKey]);

  const commitRecent = React.useCallback(
    (value: string) => {
      const v = value.trim();
      if (!v) return;
      addRecent(v);
    },
    [addRecent]
  );

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
        onCommit={commitRecent}
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
          nickname={user?.name ?? "사용자"}
          recommended={recommendedPacks}
        />
      ) : (
        <SearchLandingSection
          recents={recents}
          onClear={clearRecents}
          onRemove={removeRecent}
          onSelectRecent={(value) => {
            setSelectedPopularId(null);
            addRecent(value);

            const categorySlug = labelToSlug(value) ?? value;
            if (labelToSlug(value) || slugToLabel(categorySlug)) {
              router.push(`/search?categories=${categorySlug}`);
              return;
            }

            setQuery(value);
          }}
          popular={popularKeywords}
          selectedId={selectedPopularId}
          onSelectPopular={(value, id) => {
            setSelectedPopularId(id);
            const label = popularKeywords.find((x) => x.id === id)?.label ?? value;
            addRecent(label);
            const categorySlug = labelToSlug(label) ?? value;

            if (labelToSlug(label) || slugToLabel(categorySlug)) {
              router.push(`/search?categories=${categorySlug}`);
              return;
            }

            setQuery(label);
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