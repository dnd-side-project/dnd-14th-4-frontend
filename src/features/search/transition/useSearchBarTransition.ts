"use client";

import { useCallback, useRef, useState } from "react";
type Router = { push: (href: string, options?: { scroll?: boolean }) => void };
import {
  DURATION,
  EASE,
  TITLE_FADE_DURATION,
  getHeaderBarTargetStyle,
  type Rect,
} from "./constants";
import { useSearchTransitionContext } from "./SearchTransitionContext";

export type ForwardOverlay = {
  visible: true;
  barRect: Rect;
  targetStyle: Rect;
  onComplete: () => void;
};

export type ReturnOverlay = {
  visible: true;
  targetRect: Rect;
  initialStyle: Rect;
  onComplete: () => void;
};

export function useSearchBarTransition(router: Router) {
  const {
    setFromHome,
    setHomeBarRect,
    returnOverlayRect,
    clearReturning,
  } = useSearchTransitionContext();
  const searchBarRef = useRef<HTMLDivElement>(null);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [barRect, setBarRect] = useState<Rect | null>(null);

  const targetStyle = getHeaderBarTargetStyle();

  const startTransition = useCallback(() => {
    const el = searchBarRef.current;
    if (!el) return;

    const readRect = () => {
      const rect = el.getBoundingClientRect();
      const r: Rect = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };
      setHomeBarRect(r);
      setBarRect(r);
      setIsTransitioning(true);
    };

    if (typeof requestAnimationFrame !== "undefined") {
      requestAnimationFrame(readRect);
    } else {
      readRect();
    }
  }, [setHomeBarRect]);

  const onForwardComplete = useCallback(() => {
    setFromHome(true);
    router.push("/search", { scroll: false });
  }, [router, setFromHome]);

  const onReturnComplete = useCallback(() => {
    clearReturning();
  }, [clearReturning]);

  const forwardOverlay: ForwardOverlay | null =
    isTransitioning && barRect
      ? {
          visible: true,
          barRect,
          targetStyle,
          onComplete: onForwardComplete,
        }
      : null;

  const returnOverlay: ReturnOverlay | null =
    returnOverlayRect
      ? {
          visible: true,
          targetRect: returnOverlayRect.rect,
          initialStyle: targetStyle,
          onComplete: onReturnComplete,
        }
      : null;

  return {
    searchBarRef,
    titleVisible: !isTransitioning,
    titleTransition: { duration: TITLE_FADE_DURATION, ease: EASE },
    forwardOverlay,
    returnOverlay,
    startTransition,
    transitionConfig: { duration: DURATION, ease: EASE },
  };
}
