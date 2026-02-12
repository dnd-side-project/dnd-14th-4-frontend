"use client";

import { useCallback, useState } from "react";

export function useSearchMode() {
  const [isSearchMode, setIsSearchMode] = useState(false);

  const enter = useCallback(() => setIsSearchMode(true), []);
  const exit = useCallback(() => setIsSearchMode(false), []);

  return { isSearchMode, enter, exit, setIsSearchMode };
}
