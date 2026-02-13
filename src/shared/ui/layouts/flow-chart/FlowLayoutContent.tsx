"use client";

import * as React from "react";
import { cn } from "@/shared/lib/cn";
import type { FlowContentProps } from "./types";

export function FlowLayoutContent({
  children,
  className,
  hasFooter = true,
}: FlowContentProps) {
  return (
    <section
      className={cn(
        "flex-1 max-w-mobile w-full mx-auto px-5 pt-8",
        hasFooter ? "pb-28" : "pb-8",
        className,
      )}
    >
      {children}
    </section>
  );
}
