"use client";

import { useEffect, useRef, useState } from "react";
type Router = { back: () => void };
import { useSearchTransitionContext } from "./SearchTransitionContext";

export function useSearchPageTransition(router: Router) {
  const ctx = useSearchTransitionContext();
  const [fromHome] = useState(() => ctx.fromHome);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ctx.clearFromHome();
    // 마운트 시 한 번만 플래그 초기화 (ctx 의존 시 무한 업데이트 발생)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fromHome && inputRef.current) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [fromHome]);

  const handleBack = () => router.back();

  return {
    fromHome,
    handleBack,
    inputRef,
  };
}
