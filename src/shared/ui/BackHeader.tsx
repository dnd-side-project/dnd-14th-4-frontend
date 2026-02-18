"use client";

import React from "react";
import { IcSvgArrowLeftSmall } from "@/shared/icons";
import { cn } from "@/shared/lib/cn";

interface BackHeaderProps {
  onBack: () => void;
  /** 헤더 오른쪽 영역(제목 등) */
  children?: React.ReactNode;
  className?: string;
}

export function BackHeader({ onBack, children, className }: BackHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center min-h-[32px] w-full p-5",
        className
      )}
    >
      <button
        type="button"
        onClick={onBack}
        className="flex items-center justify-center h-8 w-8 shrink-0"
        aria-label="뒤로가기"
      >
        <IcSvgArrowLeftSmall className="h-8 w-8 text-label-default" />
      </button>
      {children != null && (
        <div className="flex-1 min-w-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </header>
  );
}
