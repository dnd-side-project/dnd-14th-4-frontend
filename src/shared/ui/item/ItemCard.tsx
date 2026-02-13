"use client"

import { useState } from "react"
import { IcSvgMore, IcSvgWish, IcSvgWishBtn } from "@/shared/icons"
import { ItemFolderBg } from "./itemfolder-bg"

export interface ItemCardData {
  id: string
  tag: string
  tagColor?: string
  itemCount: number
  title: string
  author: string
  liked?: boolean
}

export const MOCK_ITEM_CARDS: ItemCardData[] = [
  {
    id: "1",
    tag: "운동/산책",
    itemCount: 8,
    title: "아이템 이름은 최대 길이 20자입니다",
    author: "닉네임은열자가최대야",
    liked: false,
  },
]

interface ItemCardProps extends Omit<ItemCardData, "id"> {
  id?: string
}

export function ItemCard({
  tag,
  itemCount,
  title,
  author,
  liked = false,
}: ItemCardProps) {
  const [isLiked, setIsLiked] = useState(liked)

  return (
    <div className="relative w-full">
      <ItemFolderBg className="absolute inset-0 h-full w-full" />

      <div className="relative z-10 flex h-full flex-col px-6 pt-4 pb-6 sm:px-7 sm:pb-6 sm:pt-4">
     
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 type-label2 sm:px-3 sm:py-1 sm:text-sm bg-pink-95 text-primary-normal`}
          >
            {tag}
          </span>
          <span className="shrink-0 type-caption1 text-neutral-400 sm:text-sm">
            {itemCount} items
          </span>
        </div>

        {/* Bottom row: Title + Author | Actions */}
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
