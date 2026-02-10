"use client";

import * as React from "react";
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
        <div className={cn("space-y-2", showTopRow && "mt-6")}>
          {title && <h1 className="text-xl font-bold leading-snug">{title}</h1>}
          {description && (
            <p className="text-sm text-neutral-500">{description}</p>
          )}
        </div>
      )}
    </header>
  );
}
