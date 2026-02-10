"use client";

import { useFormContext } from "react-hook-form";
import { MOMENT_OPTIONS } from "../../model/constants";
import type { OnboardingFormValues } from "../../model/schema";
import { ChipButton } from "../components/ChipButton";

type MomentValue = (typeof MOMENT_OPTIONS)[number];

export function StepMoments() {
  const { watch, setValue } = useFormContext<OnboardingFormValues>();
  const selected = watch("moments"); 

  const toggle = (v: MomentValue) => {
    const exists = selected.includes(v);
    if (exists) {
      setValue(
        "moments",
        selected.filter((x) => x !== v),
        { shouldValidate: true },
      );
      return;
    }
    if (selected.length >= 3) return;
    setValue("moments", [...selected, v], { shouldValidate: true });
  };

  return (
    <div>
      <p className="text-sm text-neutral-500 mb-4">
        최대 3개까지 골라보세요! 설정은 나중에 언제든 바꿀 수 있어요.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {MOMENT_OPTIONS.map((v) => {
          const isSelected = selected.includes(v);
          const disabled = !isSelected && selected.length >= 3;

          return (
            <ChipButton
              key={v}
              selected={isSelected}
              disabled={disabled}
              onClick={() => toggle(v)}
            >
              {v}
            </ChipButton>
          );
        })}
      </div>
    </div>
  );
}
