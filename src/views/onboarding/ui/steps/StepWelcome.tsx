"use client";

import { cn } from "@/shared/lib/cn";
import { IcSvgLogo, IcSvgTextLogo } from "@/shared/icons";

interface StepWelcomeProps {
  nickname: string;
}

export function StepWelcome({ nickname }: StepWelcomeProps) {
  const displayNickname = (nickname || "").trim();

  return (
    <div className="h-full min-h-0 flex flex-col">
      <div className="pt-2 space-y-2 text-left">
        <h2 className="type-heading2 text-label-default">환영해요!</h2>

        <p className="type-heading2 text-label-default leading-relaxed whitespace-pre-line">
          이제{" "}
          <span className={cn("px-1", displayNickname && "text-pink-500")}>
            {displayNickname || "사용자"}
          </span>
          님을 위한{"\n"}
          팩을 탐색해보세요!
        </p>
      </div>

      <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-3">
        <IcSvgLogo className="w-30 h-30" />
        <IcSvgTextLogo className="w-80 h-20" />
      </div>
    </div>
  );
}
