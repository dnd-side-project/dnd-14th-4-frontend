"use client"

import { useState } from "react"
import { IcSvgMore, IcSvgWish, IcSvgWishBtn } from "@/shared/icons"

export interface PackCardData {
  id: string
  tag: string
  tagColor?: string
  itemCount: number
  title: string
  author: string
  liked?: boolean
}

export const MOCK_PACK_CARDS: PackCardData[] = [
  {
    id: "1",
    tag: "운동/산책",
    itemCount: 8,
    title: "팩 이름은 최대 길이 20자입니다다다",
    author: "닉네임은열자가최대야",
    liked: false,
  },
]

interface PackCardProps extends Omit<PackCardData, "id"> {
  id?: string
}

function PackFolderBg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 352 138"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <g filter="url(#filter0_ddd_2670_1135)">
        {/* Back tab - beige */}
        <path
          d="M8.5 26C8.5 14.9543 17.4543 6 28.5 6H323.5C334.546 6 343.5 14.9543 343.5 26V108C343.5 119.046 334.546 128 323.5 128H28.5C17.4543 128 8.5 119.046 8.5 108V26Z"
          fill="#EDEAE4"
          shapeRendering="crispEdges"
        />
        {/* Front body - white */}
        <path
          d="M8 26.0005C8 14.9548 16.9543 6.00052 28 6.00049L224.464 6.00002C229.118 6.00001 233.626 7.62271 237.211 10.5887L265.952 34.361C269.538 37.3269 274.046 38.9496 278.699 38.9497L323.5 38.95C334.546 38.9501 343.5 47.9044 343.5 58.95V108C343.5 119.046 334.546 128 323.5 128H28C16.9543 128 8 119.046 8 108V26.0005Z"
          fill="white"
        />
        {/* Folder icon */}
        <path
          d="M276.09 28.25C275.669 28.25 275.313 28.1042 275.021 27.8125C274.729 27.5208 274.583 27.1645 274.583 26.7435V17.2565C274.583 16.8355 274.729 16.4792 275.021 16.1875C275.313 15.8958 275.669 15.75 276.09 15.75H280.042C280.243 15.75 280.436 15.789 280.621 15.8671C280.806 15.945 280.968 16.0524 281.104 16.1892L282.332 17.4167H288.91C289.331 17.4167 289.688 17.5625 289.979 17.8542C290.271 18.1458 290.417 18.5022 290.417 18.9231V26.7435C290.417 27.1645 290.271 27.5208 289.979 27.8125C289.688 28.1042 289.331 28.25 288.91 28.25H276.09Z"
          fill="#9D9A95"
        />
        {/* PACK text */}
        <path
          d="M297.351 27V17.8086H300.804C302.911 17.8086 304.041 19.0908 304.041 20.8555C304.041 22.6201 302.898 23.8896 300.778 23.8896H299.001V27H297.351ZM299.001 22.5312H300.55C301.794 22.5312 302.353 21.833 302.353 20.8555C302.353 19.8652 301.794 19.1924 300.55 19.1924H299.001V22.5312ZM305.764 27H303.999L307.236 17.8086H309.268L312.518 27H310.753L309.991 24.7275H306.525L305.764 27ZM306.97 23.3945H309.547L308.29 19.6875H308.214L306.97 23.3945ZM319.623 20.9062C319.433 19.8018 318.544 19.167 317.427 19.167C315.916 19.167 314.862 20.3223 314.862 22.4043C314.862 24.5117 315.929 25.6416 317.427 25.6416C318.519 25.6416 319.407 25.0322 319.623 23.9531H321.286C321.032 25.7178 319.585 27.127 317.401 27.127C314.977 27.127 313.199 25.3623 313.199 22.4043C313.199 19.4336 315.002 17.6816 317.401 17.6816C319.433 17.6816 321.007 18.8623 321.286 20.9062H319.623ZM322.958 27V17.8086H324.608V22.0361H324.735L328.328 17.8086H330.347L326.792 21.9346L330.385 27H328.392L325.637 23.0518L324.608 24.2578V27H322.958Z"
          fill="#9D9A95"
        />
      </g>
      <defs>
        <filter
          id="filter0_ddd_2670_1135"
          x="0"
          y="0"
          width="351.5"
          height="138"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2670_1135"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_2670_1135"
            result="effect2_dropShadow_2670_1135"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_2670_1135"
            result="effect3_dropShadow_2670_1135"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_2670_1135"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export function PackCard({
  tag,
  itemCount,
  title,
  author,
  liked = false,
}: PackCardProps) {
  const [isLiked, setIsLiked] = useState(liked)

  return (
    <div className="relative w-full">
      <PackFolderBg className="absolute inset-0 h-full w-full" />

      <div className="relative z-10 flex h-full flex-col px-5 pb-5 pt-3 sm:px-7 sm:pb-6 sm:pt-4">
     
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

        <div className="mt-4 flex items-start justify-between gap-2 sm:mt-5">
          <div className="min-w-0 flex-1">
            <h3 className="truncate type-headline2 text-neutral-900 sm:text-lg">
              {title}
            </h3>
            <p className="mt-0.5 truncate type-caption1 text-neutral-400 sm:mt-1 sm:text-sm">
              {author}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 pr-3">
            <button
              type="button"
              aria-label={isLiked ? "좋아요 취소" : "좋아요"}
              className="text-neutral-300 transition-colors "
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
              className="rounded-full p-0.5 text-neutral-400 transition-colors "
            >
              <IcSvgMore className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
