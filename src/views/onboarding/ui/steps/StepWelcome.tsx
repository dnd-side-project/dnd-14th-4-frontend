"use client";

import { useFormContext } from "react-hook-form";
import { OnboardingFormValues } from "../../model/schema";

export function StepWelcome() {
  const { watch } = useFormContext<OnboardingFormValues>();
  const nickname = watch("nickname");

  return (
    <div className="pt-2">
      <p className="text-xl font-bold leading-snug">
        환영해요! <span className="text-pink-500">{nickname}</span>님을 위한
        <br />
        팩을 탐색해보세요!
      </p>
    </div>
  );
}
