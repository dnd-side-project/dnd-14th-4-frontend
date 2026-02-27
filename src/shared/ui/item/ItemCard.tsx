"use client"

import { useState, useEffect } from "react"
import { IcSvgCheckCircle, IcSvgMore, IcSvgWishBtn } from "@/shared/icons"
import { ItemFolderBg } from "./itemfolder-bg"
import Tag1Btn from "../Tag1Btn"
import { Item } from "@/entities/item/model/types"
import { buildDisplayTags } from "@/shared/utils/ItemCard.utils"
import { useToggleWish } from "@/entities/wishlist/model/useToggleWish"

/** API 만족도 값 → 검정 배경 */
export type ItemCardSatisfaction = "좋아요" | "매우좋아요" | "인생템"

/** API 사용기간 값 → Beige/60 배경 */
export type ItemCardUsagePeriod =
  | "1년이하"
  | "1년이상"
  | "3년이상"
  | "5년이상"

interface ItemCardProps extends Omit<Item, "id"> {
  id: number
  onMoreClick?: () => void
  onDetailClick?: () => void
  showLike?: boolean
  isSelectMode?: boolean
  isChecked?: boolean
  onSelect?: (id: string) => void
}

const tagVariantClass = {
  black:
    "!bg-black !text-secondary-beige border-0 hover:!bg-black active:!bg-black",
  beige60:
    "!bg-beige-60 !text-white border-0 hover:!bg-beige-60 active:!bg-beige-60",
} as const

export function ItemCard({
  id,
  satisfaction,
  usePeriod,
  brandName,
  productName,
  liked = false,
  onMoreClick,
  onDetailClick,
  showLike,
  isSelectMode = false,
  isChecked = false,
  onSelect,
}: ItemCardProps) {
  const [isLiked, setIsLiked] = useState(liked);
  const { mutate: toggleWish } = useToggleWish();
  const displayTags = buildDisplayTags(satisfaction, usePeriod);

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const nextLikedStatus = !isLiked;

    setIsLiked(nextLikedStatus);

    toggleWish(
      { itemId: id, isWished: isLiked },
      {
        onError: () => {
          setIsLiked(isLiked);
        }
      }
    );
  };

  const handleCardClick = () => {
    if (isSelectMode) {
      onSelect?.(String(id))
    } else {
      onDetailClick?.()
    }
  }

  return (
    <div
      className="relative w-full cursor-pointer transition-transform active:scale-[0.98]"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <ItemFolderBg className="absolute inset-0 h-full w-full text-beige-80" />

      <div className="relative z-10 flex h-full flex-col px-6 pt-4 pb-6 sm:px-7 sm:pb-6 sm:pt-4">
        <div className="flex items-center gap-2 flex-wrap">
          {displayTags.map((t) => (
            <Tag1Btn trailing key={t.label} className={tagVariantClass[t.variant]}>
              {t.label}
            </Tag1Btn>
          ))}
        </div>

        <div className="mt-4 flex items-start justify-between gap-2 sm:mt-5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <h3 className="truncate type-headline2 sm:text-lg text-neutral-900">
                {productName}
              </h3>
              {showLike && !isSelectMode && (
                <button
                  type="button"
                  className="shrink-0 p-1 transition-colors"
                  aria-label={isLiked ? "좋아요 취소" : "좋아요"}
                  onClick={handleLikeClick}
                >
                  <IcSvgWishBtn
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill={isLiked ? "var(--color-primary-subtler)" : "var(--alpha-5)"}
                    strokeColor={isLiked ? "var(--color-primary-subtle)" : "var(--alpha-22)"}
                  />
                </button>
              )}
            </div>
            <p className="mt-0.5 truncate type-caption1 sm:mt-1 sm:text-sm text-neutral-400">
              {brandName}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">


            <button
              type="button"
              className="rounded-full p-0.5 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                if (isSelectMode) {
                  onSelect?.(String(id))
                } else {
                  onMoreClick?.()
                }
              }}
            >
              {isSelectMode ? (
                <IcSvgCheckCircle
                  className={`h-7 w-7 ${isChecked ? "text-primary-normal" : "text-neutral-200"}`}
                />
              ) : (
                <IcSvgMore className="h-5 w-5 text-neutral-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}