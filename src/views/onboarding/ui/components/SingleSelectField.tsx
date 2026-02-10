"use client";

import { Controller, useFormContext } from "react-hook-form";
import { ChipButton } from "./ChipButton";
import type { OnboardingFormValues } from "../../model/schema";

type Name = "ageRange" | "gender";

type OptionOf<N extends Name> = Exclude<OnboardingFormValues[N], undefined>;

type Props<N extends Name> = {
  label: string;
  name: N;
  options: readonly OptionOf<N>[];
};

export function SingleSelectField<N extends Name>({
  label,
  name,
  options,
}: Props<N>) {
  const { control } = useFormContext<OnboardingFormValues>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div>
          <p className="text-sm text-neutral-400 mb-3">{label}</p>

          <div className="flex flex-wrap gap-2">
            {options.map((v) => (
              <ChipButton
                key={v}
                selected={field.value === v}
                onClick={() => field.onChange(v)}
              >
                {v}
              </ChipButton>
            ))}
          </div>
        </div>
      )}
    />
  );
}
