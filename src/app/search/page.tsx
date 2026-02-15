"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  IcSvgArrowLeftBig,
  IcSvgCloseBig,
  IcSvgFilter,
  IcSvgHistory,
  IcSvgSearch,
} from "@/shared/icons"

import {
  parseCategoriesParam,
  categoriesToQuery,
  slugToLabel,
} from "@/features/search/model/categories"
import {
  POPULAR_KEYWORDS,
  RECENT_SEARCHES,
  type RecentSearch,
} from "@/features/search/model/mock"
import { PackCard, MOCK_PACK_CARDS } from "@/shared/ui/item/PackCard"
import { CategoryChip } from "@/shared/ui/CategoryChip"
import { BtnSelection } from "@/shared/ui/BtnSelection"
import { useSearchPageTransition } from "@/features/search/transition"

function SearchPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = React.useState("")
  const [recents, setRecents] = React.useState<RecentSearch[]>(RECENT_SEARCHES)
  const [selectedPopularId, setSelectedPopularId] = React.useState<string | null>("p2")

  const { handleBack, inputRef: searchInputRef } = useSearchPageTransition(router)

  const categorySlugs = React.useMemo(
    () => parseCategoriesParam(searchParams.get("categories")),
    [searchParams]
  )
  const selectedLabels = React.useMemo(
    () =>
      categorySlugs
        .map((slug) => slugToLabel(slug))
        .filter((label): label is string => Boolean(label)),
    [categorySlugs]
  )

  const filteredPacks = React.useMemo(() => {
    if (selectedLabels.length === 0) return MOCK_PACK_CARDS
    return MOCK_PACK_CARDS.filter((pack) => selectedLabels.includes(pack.tag))
  }, [selectedLabels])

  const removeCategory = (slugToRemove: string) => {
    const next = categorySlugs.filter((s) => s !== slugToRemove)
    const queryString = next.length > 0 ? `?categories=${categoriesToQuery(next)}` : ""
    router.replace(`/search${queryString}`)
  }

  const clearAll = () => setRecents([])
  const removeOne = (id: string) =>
    setRecents((prev) => prev.filter((x) => x.id !== id))

  const hasCategoryFilter = categorySlugs.length > 0

  return (
    <main className="min-h-dvh bg-white pb-24">
      <header className="px-4 pt-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={handleBack}
            className="grid h-11 w-11 place-items-center rounded-xl"
          >
            <IcSvgArrowLeftBig className="h-5 w-5 text-neutral-800" />
          </button>

          <div className="flex-1">
            <div className="flex h-11 items-center gap-2 rounded-xl bg-neutral-100 px-3">
              <IcSvgSearch className="h-5 w-5 shrink-0 text-neutral-400" />
              <input
                ref={searchInputRef as React.RefObject<HTMLInputElement>}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="다양한 팩을 검색해보세요."
                className="h-full w-full bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
              />
            </div>
          </div>

          <button
            type="button"
            aria-label="필터"
            onClick={() => {
              const query = categorySlugs.length > 0
                ? `?categories=${categoriesToQuery(categorySlugs)}`
                : ""
              router.push(`/filter-search${query}`)
            }}
            className="grid h-11 w-11 place-items-center rounded-xl"
          >
            <IcSvgFilter className="h-5 w-5 text-neutral-800" />
          </button>
        </div>
      </header>

      {hasCategoryFilter && (
        <section className="px-6 pt-3">
          <div className="flex gap-2 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
            {categorySlugs.map((slug) => {
              const label = slugToLabel(slug)
              if (!label) return null
              return (
                <span key={slug} className="shrink-0">
                  <CategoryChip
                    label={label}
                    onRemove={() => removeCategory(slug)}
                  />
                </span>
              )
            })}
          </div>
        </section>
      )}

      {hasCategoryFilter ? (
        <section className="px-4 pt-6">
          <div className="space-y-4">
            {filteredPacks.length === 0 ? (
              <p className="py-8 text-center type-body2 text-neutral-400">
                선택한 카테고리에 맞는 팩이 없습니다.
              </p>
            ) : (
              <ul className="flex flex-col gap-4">
                {filteredPacks.map((card) => (
                  <li key={card.id} className="max-w-[352px]">
                    <PackCard {...card} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ) : (
        <>
          <section className="px-4 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-neutral-400">
                최근 검색어
              </h2>
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-semibold text-neutral-400"
              >
                전체 삭제
              </button>
            </div>

            {recents.length === 0 ? (
              <div className="mt-6 flex h-37 items-center justify-center rounded-xl bg-transparent">
                <p className="type-label1 text-neutral-400">
                  최근 검색어가 없습니다.
                </p>
              </div>
            ) : (
              <ul className="mt-3 divide-y divide-neutral-200">
                {recents.map((item) => (
                  <li key={item.id} className="flex items-center gap-3 py-4">
                    <IcSvgHistory className="h-5 w-5 shrink-0 text-neutral-400" />
                    <span className="flex-1 text-sm text-neutral-800">
                      {item.keyword}
                    </span>
                    <button
                      type="button"
                      aria-label="삭제"
                      onClick={() => removeOne(item.id)}
                      className="grid h-8 w-8 place-items-center text-neutral-400"
                    >
                      <IcSvgCloseBig className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-10">
              <h3 className="text-xs font-semibold text-neutral-400">
                인기 키워드
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {POPULAR_KEYWORDS.map((kw) => (
                  <BtnSelection
                    key={kw.id}
                    selected={selectedPopularId === kw.id}
                    onClick={() => setSelectedPopularId(kw.id)}
                  >
                    {kw.label}
                  </BtnSelection>
                ))}
              </div>
            </div>
          </section>

        </>
      )}
    </main>
  )
}

export default function SearchPage() {
  return (
    <React.Suspense fallback={<div className="min-h-dvh bg-white" />}>
      <SearchPageContent />
    </React.Suspense>
  )
}
