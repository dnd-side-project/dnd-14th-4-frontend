"use client"

import { IcSvgCloseSmall } from "@/shared/icons"
import Tag1Btn from "@/shared/ui/Tag1Btn"

interface CategoryChipProps {
  label: string
  onRemove: () => void
}

export function CategoryChip({ label, onRemove }: CategoryChipProps) {
  return (
    <Tag1Btn
      variant="primary"
      mode="chip"
      trailing={
        <button
          type="button"
          aria-label={`${label} 제거`}
          onClick={onRemove}
          className="grid place-items-center rounded-full p-0.5 text-white transition-colors hover:bg-neutral-700"
        >
          <IcSvgCloseSmall className="h-4 w-4 [&_path]:fill-white" />
        </button>
      }
    >
      {label}
    </Tag1Btn>
  )
}
