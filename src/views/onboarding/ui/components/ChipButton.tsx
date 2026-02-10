// src/views/onboarding/ui/components/ChipButton.tsx
"use client";

import { cn } from "@/shared/lib/cn";

type Props = {
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

export function ChipButton({ selected, onClick, children, disabled }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "h-12 rounded-xl px-5 text-sm font-medium transition-colors",
        selected ? "bg-black text-white" : "bg-neutral-100 text-neutral-700",
        disabled && "opacity-50"
      )}
    >
      {children}
    </button>
  );
}
