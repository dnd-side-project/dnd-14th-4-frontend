"use client";

import { cn } from "@/shared/lib/cn";

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1 w-full rounded-full bg-neutral-200">
      <div
        className={cn("h-1 rounded-full bg-pink-500 transition-all")}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
