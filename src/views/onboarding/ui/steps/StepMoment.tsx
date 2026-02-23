"use client";

import { MOMENT_OPTIONS } from "../../model/constants";
import { MultiSelectGroup } from "@/shared/ui/MultiSelectGroup";

interface StepMomentsProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function StepMoments({ selected, onChange }: StepMomentsProps) {
  return (
    <div>
      <MultiSelectGroup
        options={MOMENT_OPTIONS}
        selected={selected}
        onChange={(newSelected) => onChange(newSelected as string[])}
        maxCount={3}
      />
    </div>
  );
}