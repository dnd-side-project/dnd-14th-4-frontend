"use client";

import * as React from "react";
import { cn } from "@/shared/lib/cn";
import type { FlowFooterProps } from "./types";

export function FlowLayoutFooter({
  label,
  disabled,
  onClick,
  className,
  maxWidthMobile = true,
}: FlowFooterProps) {
  return (
    <footer className={cn("fixed inset-x-0 bottom-0 bg-white z-50", className)}>
      <div
        className={cn(
          maxWidthMobile && "max-w-mobile w-full mx-auto",
          "px-5 pt-3 pb-[calc(20px+env(safe-area-inset-bottom))]",
        )}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={onClick}
          className={cn(
            "h-12 w-full rounded-xl font-semibold",
            disabled
              ? "bg-neutral-95 text-label-subtle"
              : "bg-black text-white",
          )}
        >
          {label}
        </button>
      </div>
    </footer>
  );
}
