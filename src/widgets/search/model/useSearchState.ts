"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { parseCategoriesParam, slugToLabel } from "@/features/search/model/categories";
import { MOCK_PACK_CARDS } from "@/features/search/model/mock";

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

  const normalizedQuery = query.trim().toLowerCase();

  const filteredPacks = React.useMemo(() => {
    let list = MOCK_PACK_CARDS;

    if (selectedLabels.length) {
      list = list.filter((p) => selectedLabels.includes(p.tag));
    }

    if (normalizedQuery) {
      list = list.filter((p) =>
        `${p.title} ${p.author} ${p.tag}`
          .toLowerCase()
          .includes(normalizedQuery)
      );
    }

    return list;
  }, [selectedLabels, normalizedQuery]);

  const hasIntent = selectedLabels.length > 0 || normalizedQuery.length > 0;
  const isEmpty = hasIntent && filteredPacks.length === 0;

  const recommendedPacks = React.useMemo(
    () => MOCK_PACK_CARDS.slice(0, 2),
    []
  );

  return {
    categorySlugs,
    filteredPacks,
    hasIntent,
    isEmpty,
    recommendedPacks, 
  };
}