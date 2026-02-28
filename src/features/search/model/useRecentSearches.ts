"use client";

import * as React from "react";
import {
  addRecentSearch,
  clearRecentSearches,
  readRecentSearches,
  removeRecentSearch,
  type RecentSearchItem,
} from "./recentSearches";

export function useRecentSearches() {
  const [recents, setRecents] = React.useState<RecentSearchItem[]>([]);

  React.useEffect(() => {
    setRecents(readRecentSearches());
  }, []);

  React.useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === null) return;
      if (e.key !== "recent_searches_v1") return;
      setRecents(readRecentSearches());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = React.useCallback((keyword: string) => {
    setRecents(addRecentSearch(keyword));
  }, []);

  const remove = React.useCallback((id: string) => {
    setRecents(removeRecentSearch(id));
  }, []);

  const clear = React.useCallback(() => {
    clearRecentSearches();
    setRecents([]);
  }, []);

  return { recents, add, remove, clear };
}

