"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  FiChevronLeft,
  FiSearch,
  FiSliders,
  FiClock,
  FiX,
} from "react-icons/fi";

import { BtnSelection } from "@/shared/ui/BtnSelection";
import {
  POPULAR_KEYWORDS,
  RECENT_SEARCHES,
  type RecentSearch,
} from "@/features/search/model/mock";
import { FlowLayoutFooter } from "@/shared/ui/layouts/flow-chart/FlowLayoutFooter";

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [recents, setRecents] = React.useState<RecentSearch[]>(RECENT_SEARCHES);
  const [selectedPopularId, setSelectedPopularId] = React.useState("p2");

  const clearAll = () => setRecents([]);
  const removeOne = (id: string) =>
    setRecents((prev) => prev.filter((x) => x.id !== id));

  return (
    <main className="min-h-dvh bg-white pb-24">
      <header className="px-4 pt-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={() => router.back()}
            className="grid h-11 w-11 place-items-center rounded-xl"
          >
            <FiChevronLeft className="h-5 w-5 text-neutral-800" />
          </button>

          <div className="flex-1">
            <div className="flex h-11 items-center gap-2 rounded-xl bg-neutral-100 px-3">
              <FiSearch className="h-5 w-5 text-neutral-400" />
              <input
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
            onClick={() => router.push("/filter-search")}
            className="grid h-11 w-11 place-items-center rounded-xl"
          >
            <FiSliders className="h-5 w-5 text-neutral-800" />
          </button>
        </div>
      </header>

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
                <FiClock className="h-5 w-5 text-neutral-400" />
                <span className="flex-1 text-sm text-neutral-800">
                  {item.keyword}
                </span>
                <button
                  type="button"
                  aria-label="삭제"
                  onClick={() => removeOne(item.id)}
                  className="grid h-8 w-8 place-items-center text-neutral-400"
                >
                  <FiX className="h-5 w-5" />
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

      <FlowLayoutFooter
        label="다음"
        disabled={!query && !selectedPopularId}
        onClick={() => {
          console.log("다음 클릭");
        }}
      />
    </main>
  );
}
