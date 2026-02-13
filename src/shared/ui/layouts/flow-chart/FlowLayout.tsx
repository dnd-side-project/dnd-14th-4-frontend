"use client";

import * as React from "react";
import { cn } from "@/shared/lib/cn";
import { FlowLayoutHeader } from "./FlowLayoutHeader";
import { FlowLayoutContent } from "./FlowLayoutContent";
import { FlowLayoutFooter } from "./FlowLayoutFooter";

type RootProps = {
  children: React.ReactNode;
  className?: string;
};

function Root({ children, className }: RootProps) {
  return (
    <main className={cn("min-h-dvh bg-white flex flex-col", className)}>
      {children}
    </main>
  );
}

export const FlowLayout = Object.assign(Root, {
  Header: FlowLayoutHeader,
  Content: FlowLayoutContent,
  Footer: FlowLayoutFooter,
});
