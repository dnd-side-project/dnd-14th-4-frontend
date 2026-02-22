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
          className="grid place-items-center rounded-full p-0.5 text-white transition-colors "
        >
          <IcSvgCloseSmall className="h-6 w-6 [&_path]:fill-white" />
        </button>
      }
    >
      {label}
    </Tag1Btn>
  )
}
