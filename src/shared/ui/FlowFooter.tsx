"use client";

import * as React from "react";
import { cn } from "@/shared/lib/cn";
import { FiRefreshCw } from "react-icons/fi";

export type FlowFooterProps = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;

  onReset?: () => void;
  resetDisabled?: boolean;
  resetAriaLabel?: string;

  className?: string;
  aboveSlot?: React.ReactNode;
};

export function FlowFooter({
  label,
  disabled,
  onClick,
  onReset,
  resetDisabled,
  resetAriaLabel = "초기화",
  className,
  aboveSlot,
}: FlowFooterProps) {
  const hasReset = typeof onReset === "function";

  return (
    <footer className={cn("fixed inset-x-0 bottom-0 z-50 bg-white", className)}>
      <div className="mx-auto w-full max-w-mobile px-5 pt-3 pb-[calc(20px+env(safe-area-inset-bottom))]">
        {aboveSlot && (
          <div className="pt-3">
            <div className="mb-4 text-center type-caption1 text-label-subtle whitespace-pre-line">
              {aboveSlot}
            </div>
          </div>
        )}

        {hasReset ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onReset}
              disabled={resetDisabled}
              aria-label={resetAriaLabel}
              className="grid h-12 w-12 place-items-center rounded-xl bg-white disabled:opacity-40 disabled:pointer-events-none"
            >
              <FiRefreshCw className="h-7 w-7 text-neutral-70" />
            </button>

            <button
              type="button"
              disabled={disabled}
              onClick={onClick}
              className={cn(
                "h-12 flex-1 rounded-xl type-label1",
                disabled
                  ? "bg-neutral-95 text-label-subtle"
                  : "bg-black text-secondary-beige",
              )}
            >
              {label}
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={cn(
              "h-12 w-full rounded-xl type-label1",
              disabled
                ? "bg-neutral-95 text-label-subtle"
                : "bg-black text-secondary-beige",
            )}
          >
            {label}
          </button>
        )}
      </div>
    </footer>
  );
}
