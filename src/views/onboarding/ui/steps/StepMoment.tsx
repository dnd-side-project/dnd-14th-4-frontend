"use client";

import { useFormContext } from "react-hook-form";
import { MOMENT_OPTIONS } from "../../model/constants";
import type { OnboardingFormValues } from "../../model/schema";

import { MultiSelectGroup } from "@/shared/ui/MultiSelectGroup";

export function StepMoments() {
  const { watch, setValue } = useFormContext<OnboardingFormValues>();
  const selected = watch("moments");

  return (
    <div>
      <MultiSelectGroup
        options={MOMENT_OPTIONS}
        selected={selected}
        onChange={(newSelected) =>
          setValue("moments", newSelected as OnboardingFormValues["moments"], { shouldValidate: true })
        }
        maxCount={3}
      />
    </div>
  );
}