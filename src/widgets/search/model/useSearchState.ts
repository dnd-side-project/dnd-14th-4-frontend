"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { parseCategoriesParam, slugToLabel } from "@/features/search/model/categories";
import { MOCK_PACK_CARDS } from "@/features/search/model/mock";
import { useSearchPacks } from "@/features/search/model/useSearchPacks";
import { useDebounce } from "@/shared/lib/useDebounce";

export function useSearchState(query: string) {
  const searchParams = useSearchParams();

  const categorySlugs = React.useMemo(
    () => parseCategoriesParam(searchParams.get("categories")),
    [searchParams]
  );

  const selectedLabels = React.useMemo(
    () =>
      categorySlugs
        .map((slug) => slugToLabel(slug))
        .filter((l): l is string => Boolean(l)),
    [categorySlugs]
  );

  const debouncedQuery = useDebounce(query, 350);
  const normalizedQuery = debouncedQuery.trim().toLowerCase();

  const { data: searchedPacks = [] } = useSearchPacks(debouncedQuery);
  const mappedSearchResults = React.useMemo(
    () => searchedPacks.map((pack) => ({
      id: pack.id,
      tag: pack.tag,
      itemCount: pack.itemCount,
      title: pack.title,
      author: pack.author,
      liked: pack.liked ?? false,
      description: pack.description,
      date: pack.date,
    })),
    [searchedPacks]
  );

  const filteredPacks = React.useMemo(() => {
    let list = normalizedQuery ? mappedSearchResults : MOCK_PACK_CARDS;

    if (selectedLabels.length) {
      list = list.filter((p) => selectedLabels.includes(p.tag));
    }

    return list;
  }, [selectedLabels, normalizedQuery, mappedSearchResults]);

  const hasIntent = selectedLabels.length > 0 || normalizedQuery.length > 0;
  const isEmpty = hasIntent && filteredPacks.length === 0;

  const recommendedPacks = React.useMemo(
    () => MOCK_PACK_CARDS.slice(0, 2),
    []
  );

  return {
    categorySlugs,
    selectedLabels,
    filteredPacks,
    hasIntent,
    isEmpty,
    recommendedPacks,
  };
}