"use client";

import { useFormContext } from "react-hook-form";
import type { OnboardingFormValues } from "../../model/schema";
import { cn } from "@/shared/lib/cn";

export function StepWelcome() {
  const { watch } = useFormContext<OnboardingFormValues>();
  const nickname = (watch("nickname") ?? "").trim();

  return (
    <div className="pt-2 space-y-2">
      <h2 className="type-heading2 text-label-default">환영해요!</h2>

      <p className="type-heading2 text-label-default leading-relaxed whitespace-pre-line">
        이제
        <span className={cn("px-1", nickname && "text-pink-500")}>
          {nickname || "사용자"}
        </span>
        님을 위한{"\n"}
        팩을 탐색해보세요!
      </p>
    </div>
  );
}
