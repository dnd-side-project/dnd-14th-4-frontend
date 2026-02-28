"use client"

import { useState } from "react"
import { IcSvgMore, IcSvgWishBtn, IcSvgCheckCircle } from "@/shared/icons"
import { Tag2Btn } from "@/shared/ui/Tag2Btn"
import { PackFolderBg } from "./packfolder-bg"
import { useRouter } from "next/navigation"
import { useTogglePackWish } from "@/entities/wishlist/model/useTogglePackWish"

export interface PackCardData {
  id: number
  tag: string
  tagColor?: string
  itemCount: number
  title: string
  author: string
  description?: string;
  liked?: boolean
  isPackInWishList?: boolean
  date?: string
  profile?: string
}

interface PackCardProps extends Omit<PackCardData, "id"> {
  id: number
  onMoreClick?: () => void
  showLikeBtn?: boolean
  isSelectMode?: boolean
  isChecked?: boolean
  onSelect?: (id: number) => void
}

export function PackCard({
  id,
  tag,
  itemCount,
  title,
  author,
  liked,
  isPackInWishList,
  onMoreClick,
  showLikeBtn = true,
  isSelectMode = false,
  isChecked = false,
  onSelect,
}: PackCardProps) {
  const currentLikedProp = !!(liked || isPackInWishList);
  const [isLiked, setIsLiked] = useState(currentLikedProp);
  const [prevLikedProp, setPrevLikedProp] = useState(currentLikedProp);

  if (currentLikedProp !== prevLikedProp) {
    setPrevLikedProp(currentLikedProp);
    setIsLiked(currentLikedProp);
  }

  const router = useRouter()
  const { mutate: toggleWish } = useTogglePackWish();

  const handleCardClick = () => {
    if (isSelectMode) {
      onSelect?.(id)
    } else {
      router.push(`/pack/${id}`)
    }
  }

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const nextLikedStatus = !isLiked;

    setIsLiked(nextLikedStatus);

    toggleWish(
      { packId: id, isWished: !!isLiked },
      {
        onError: () => {
          setIsLiked(isLiked); // Revert on error
        }
      }
    );
  };

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
            <div className="flex items-center gap-2">

              <h3 className="truncate type-headline2 text-neutral-900 sm:text-lg">
                {title}
              </h3>
              {showLikeBtn && (
                <button
                  type="button"
                  aria-label="좋아요"
                  className="shrink-0 p-1 transition-colors"
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
            <p className="mt-0.5 truncate type-caption1 text-neutral-400 sm:mt-1 sm:text-sm">
              {author}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">


            {isSelectMode ? (
              <button
                type="button"
                aria-label="Select pack"
                aria-pressed={isChecked}
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