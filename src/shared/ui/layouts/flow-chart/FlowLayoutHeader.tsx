"use client";

import { cn } from "@/shared/lib/cn";
import type { FlowHeaderProps } from "./types";

export function FlowLayoutHeader({
  onBack,
  progressSlot,
  title,
  description,
  className,
}: FlowHeaderProps) {
  const showTopRow = !!onBack || !!progressSlot;
  const showText = !!title || !!description;

  if (!showTopRow && !showText) return null;

  return (
    <header className={cn("max-w-mobile w-full mx-auto px-5 pt-5", className)}>
      {showTopRow && (
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="p-2 -ml-2"
              aria-label="뒤로가기"
            >
              ←
            </button>
          )}

          {progressSlot && <div className="flex-1">{progressSlot}</div>}
        </div>
      )}

      {showText && (
        <div className={cn("space-y-3", showTopRow && "mt-6")}>
          {title && (
            <h1 className="type-heading1 text-label-default leading-snug">
              {title}
            </h1>
          )}
          {description && (
            <p className="type-label2 text-label-default whitespace-pre-line">
              {description}
            </p>
          )}
        </div>
      )}
    </header>
  );
}
