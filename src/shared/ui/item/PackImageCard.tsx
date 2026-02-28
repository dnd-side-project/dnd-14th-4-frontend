"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IcSvgMore, IcSvgWishBtn } from "@/shared/icons";
import { Tag2Btn } from "@/shared/ui/Tag2Btn";
import { useRouter } from "next/navigation";
import { PackImageFolderBg } from "./pack-image-card-bg";
import { useTogglePackWish } from "@/entities/wishlist/model/useTogglePackWish";

export interface PackImageCardData {
  id: number;
  tag: string;
  tagColor?: string;
  itemCount: number;
  title: string;
  author: string;
  liked?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
}

interface PackImageCardProps extends PackImageCardData {
  onMore?: () => void;
  showLikeBtn?: boolean;
}

export function PackImageCard({
  id,
  tag,
  itemCount = 8,
  title,
  author,
  liked = false,
  imageSrc,
  imageAlt = "",
  onMore,
  href,
  showLikeBtn = true,
}: PackImageCardProps) {
  const [isLiked, setIsLiked] = useState(liked);
  const router = useRouter();

  const { mutate } = useTogglePackWish();

  const safeImageSrc = (() => {
    if (!imageSrc) return undefined;
    const trimmed = imageSrc.trim();
    if (!trimmed) return undefined;
    if (
      trimmed.startsWith("/") ||
      /^https?:\/\//.test(trimmed) ||
      trimmed.startsWith("data:image/")
    ) {
      return trimmed;
    }
    return undefined;
  })();

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const handleLike = () => {
    const nextState = !isLiked;
    setIsLiked(nextState);

    mutate({ packId: id, isWished: isLiked });
  };

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };




  return (
    <div
      className="relative w-full min-h-[322px] cursor-pointer"
      onClick={handleClick}
      role={href ? "link" : undefined}
    >
      <PackImageFolderBg className="absolute inset-0 h-full w-full" />

      <div className="relative z-10 flex h-full flex-col px-5 pb-5 pt-4 sm:px-7 sm:pb-6 sm:pt-4">
        <div className="flex items-center gap-2">
          <Tag2Btn status>{tag}</Tag2Btn>
          <span className="shrink-0 text-xs text-neutral-400 sm:text-sm">
            {itemCount} items
          </span>
        </div>

        <div className="mt-4 flex items-start justify-between gap-2 sm:mt-5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h3 className="truncate text-base font-bold text-neutral-900 sm:text-lg">
                {title}
              </h3>
              {showLikeBtn && (
                <button
                  type="button"
                  aria-label="좋아요"
                  className="shrink-0 p-1 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike();
                  }}
                >
                  <IcSvgWishBtn
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill={isLiked ? "var(--color-primary-subtler)" : "var(--alpha-5)"}
                    strokeColor={isLiked ? "var(--color-primary-subtle)" : "var(--alpha-22)"}
                  />
                </button>
              )}
            </div>

            <p className="mt-0.5 truncate text-xs text-neutral-400 sm:mt-1 sm:text-sm">
              {author}
            </p>
          </div>

          <button
            type="button"
            aria-label="더보기"
            className="shrink-0 rounded-full p-0.5 text-neutral-400 transition-colors hover:bg-neutral-100"
            onClick={(e) => {
              e.stopPropagation();
              onMore?.();
            }}
          >
            <IcSvgMore className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <div className="relative mt-4 aspect-[307/138] w-full overflow-hidden rounded-xl bg-neutral-100 sm:mt-5">
          {safeImageSrc ? (
            <Image
              src={safeImageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, 600px"
              className="object-cover"
              priority={false}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-neutral-300 text-sm">No Image</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}