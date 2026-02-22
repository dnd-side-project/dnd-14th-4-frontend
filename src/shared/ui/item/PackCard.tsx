"use client"

import { useState } from "react"
import { IcSvgMore, IcSvgWish, IcSvgWishBtn, IcSvgCheckCircle } from "@/shared/icons"
import { Tag2Btn } from "@/shared/ui/Tag2Btn"
import { PackFolderBg } from "./packfolder-bg"
import { useRouter } from "next/navigation"

export interface PackCardData {
  id: string
  tag: string
  tagColor?: string
  itemCount: number
  title: string
  author: string
  description?: string;
  liked?: boolean
  date?: string
}

interface PackCardProps extends Omit<PackCardData, "id"> {
  id: string
  onMoreClick?: () => void
  showLikeBtn?: boolean
  // 선택 모드 관련 프롭 추가
  isSelectMode?: boolean
  isChecked?: boolean
  onSelect?: (id: string) => void
}

export function PackCard({
  id,
  tag,
  itemCount,
  title,
  author,
  liked = false,
  onMoreClick,
  showLikeBtn = true,
  isSelectMode = false,
  isChecked = false,
  onSelect,
}: PackCardProps) {
  const [isLiked, setIsLiked] = useState(liked)
  const router = useRouter()

  const handleCardClick = () => {
    if (isSelectMode) {
      onSelect?.(id)
    } else {
      router.push(`/pack/${id}`)
    }
  }

  return (
    <div
      className="relative w-full cursor-pointer transition-transform active:scale-[0.99]"
      onClick={handleCardClick}
    >
      <PackFolderBg className="absolute inset-0 h-full w-full" />

      <div className="relative z-10 flex h-full flex-col px-6 pt-4 pb-6 sm:px-7 sm:pb-6 sm:pt-4">
        <div className="flex items-center gap-2">
          <Tag2Btn status>{tag}</Tag2Btn>
          <span className="shrink-0 type-caption1 text-neutral-400 sm:text-sm">
            {itemCount} items
          </span>
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
            {showLikeBtn && (
              <button
                type="button"
                aria-label={isLiked ? "Unlike" : "Like"}
                className="text-neutral-300 transition-colors hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsLiked((prev) => !prev)
                }}
              >
                {isLiked ? (
                  <IcSvgWish className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                ) : (
                  <IcSvgWishBtn className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            )}

            {isSelectMode ? (
              <button
                type="button"
                aria-label="Select pack"
                className="rounded-full p-0.5 transition-colors hover:bg-black/5"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect?.(id)
                }}
              >
                <IcSvgCheckCircle
                  className={`h-7 w-7 ${isChecked ? "text-primary-normal" : "text-neutral-200"}`}
                />
              </button>
            ) : (
              <button
                type="button"
                aria-label="More options"
                className="rounded-full p-0.5 text-neutral-400 transition-colors hover:bg-black/5"
                onClick={(e) => {
                  e.stopPropagation()
                  onMoreClick?.()
                }}
              >
                <IcSvgMore className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}