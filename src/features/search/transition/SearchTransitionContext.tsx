"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Rect } from "./constants";

type State = {
  fromHome: boolean;
  homeBarRect: Rect | null;
  returning: boolean;
};

type ContextValue = State & {
  returnOverlayRect: { rect: Rect } | null;
  setFromHome: (v: boolean) => void;
  setHomeBarRect: (r: Rect | null) => void;
  setReturning: () => void;
  clearFromHome: () => void;
  clearReturning: () => void;
};

const Ctx = createContext<ContextValue | null>(null);

const initial: State = {
  fromHome: false,
  homeBarRect: null,
  returning: false,
};

export function SearchTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<State>(initial);

  const setFromHome = useCallback((value: boolean) => {
    setState((p) => ({ ...p, fromHome: value }));
  }, []);
  const setHomeBarRect = useCallback((rect: Rect | null) => {
    setState((p) => ({ ...p, homeBarRect: rect }));
  }, []);
  const setReturning = useCallback(() => {
    setState((p) => ({ ...p, returning: true }));
  }, []);
  const clearFromHome = useCallback(() => {
    setState((p) => ({ ...p, fromHome: false }));
  }, []);
  const clearReturning = useCallback(() => {
    setState((p) => ({ ...p, returning: false, homeBarRect: null }));
  }, []);

  const value = useMemo<ContextValue>(() => {
    const returnOverlayRect =
      state.returning && state.homeBarRect
        ? { rect: state.homeBarRect }
        : null;
    return {
      ...state,
      returnOverlayRect,
      setFromHome,
      setHomeBarRect,
      setReturning,
      clearFromHome,
      clearReturning,
    };
  }, [state, setFromHome, setHomeBarRect, setReturning, clearFromHome, clearReturning]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSearchTransitionContext(): ContextValue {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error(
      "useSearchTransitionContext must be used within SearchTransitionProvider"
    );
  }
  return ctx;
}
