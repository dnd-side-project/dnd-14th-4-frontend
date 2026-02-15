"use client"

import { useState } from "react"
import { IcSvgMore, IcSvgWish, IcSvgWishBtn } from "@/shared/icons"
import { Tag2Btn } from "@/shared/ui/Tag2Btn"
import { ItemFolderBg } from "./itemfolder-bg"

/** API 만족도 값 → 검정 배경 */
export type ItemCardSatisfaction = "좋아요" | "매우좋아요" | "인생템"

/** API 사용기간 값 → Beige/60 배경 */
export type ItemCardUsagePeriod =
  | "1년이하"
  | "1년이상"
  | "3년이상"
  | "5년이상"

export interface ItemCardData {
  id: string
  satisfaction?: ItemCardSatisfaction
  usagePeriod?: ItemCardUsagePeriod
  itemCount: number
  title: string
  author: string
  liked?: boolean
}

export const MOCK_ITEM_CARDS: ItemCardData[] = [
  {
    id: "1",
    satisfaction: "좋아요",
    usagePeriod: "1년이상",
    itemCount: 8,
    title: "아이템 이름은 최대 길이 20자입니다",
    author: "닉네임은열자가최대야",
    liked: false,
  },
]

interface ItemCardProps extends Omit<ItemCardData, "id"> {
  id?: string
}

const tagVariantClass = {
  black:
    "!bg-black !text-secondary-beige border-0 hover:!bg-black active:!bg-black",
  beige60:
    "!bg-beige-60 !text-white border-0 hover:!bg-beige-60 active:!bg-beige-60",
} as const

/** API 값(satisfaction, usagePeriod)을 태그 표시용 배열로 변환 */
function buildDisplayTags(
  satisfaction?: ItemCardSatisfaction,
  usagePeriod?: ItemCardUsagePeriod
): { label: string; variant: "black" | "beige60" }[] {
  const tags: { label: string; variant: "black" | "beige60" }[] = []
  if (satisfaction) tags.push({ label: satisfaction, variant: "black" })
  if (usagePeriod) tags.push({ label: usagePeriod, variant: "beige60" })
  return tags
}

export function ItemCard({
  satisfaction,
  usagePeriod,
  title,
  author,
  liked = false,
}: ItemCardProps) {
  const [isLiked, setIsLiked] = useState(liked)
  const displayTags = buildDisplayTags(satisfaction, usagePeriod)

  return (
    <div className="relative w-full">
      <ItemFolderBg className="absolute inset-0 h-full w-full" />

      <div className="relative z-10 flex h-full flex-col px-6 pt-4 pb-6 sm:px-7 sm:pb-6 sm:pt-4">
     
        <div className="flex items-center gap-2 flex-wrap">
          {displayTags.map((t) => (
            <Tag2Btn key={t.label} className={tagVariantClass[t.variant]}>
              {t.label}
            </Tag2Btn>
          ))}
        </div>

        <div className="mt-4 flex items-start justify-between gap-2 sm:mt-5">
          <div className="min-w-0 flex-1">
            <h3 className="truncate type-headline2 text-neutral-900 sm:text-lg">
              {title}
            </h3>
            <p className="mt-0.5 truncate type-caption1 text-neutral-400 sm:mt-1 sm:text-sm">
              {author}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label={isLiked ? "좋아요 취소" : "좋아요"}
              className="text-neutral-300 transition-colors"
              onClick={() => setIsLiked((prev) => !prev)}
            >
              {isLiked ? (
                <IcSvgWish className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <IcSvgWishBtn className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
            <button
              type="button"
              aria-label="더보기"
              className="rounded-full p-0.5 text-neutral-400 transition-colors"
            >
              <IcSvgMore className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
