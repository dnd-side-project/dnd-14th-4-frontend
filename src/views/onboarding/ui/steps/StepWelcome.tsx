"use client";

import { cn } from "@/shared/lib/cn";

interface StepWelcomeProps {
  nickname: string;
}

export function StepWelcome({ nickname }: StepWelcomeProps) {
  const displayNickname = (nickname || "").trim();

  return (
    <div className="pt-2 space-y-2">
      <h2 className="type-heading2 text-label-default">환영해요!</h2>

      <p className="type-heading2 text-label-default leading-relaxed whitespace-pre-line">
        이제
        <span className={cn("px-1", displayNickname && "text-pink-500")}>
          {displayNickname || "사용자"}
        </span>
        님을 위한{"\n"}
        팩을 탐색해보세요!
      </p>
    </div>
  );
}
