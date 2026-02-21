"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { SearchBarOverlay, useSearchBarTransition } from "@/features/search/transition";
import { HomeSearchHeader } from "@/widgets/home-search-header/ui/HomeSearchHeader";
import Tag1Btn from "@/shared/ui/Tag1Btn";
import IcSvgArrowRightSmall from "@/shared/icons/ic_arrowrightsmall";
import { PACKS_BY_TAG, Tag, TAGS } from "@/features/search/model/mock";
import { MAIN_GREETINGS, pickRandomGreeting, type Greeting } from "../model/greeting";

import {  type PackCardData } from "@/shared/ui/item/PackCard";

import {
  MOCK_HOME_PACKS_API,
  MOCK_ONBOARDING_CATEGORIES,
  getCategoryTitle,
  groupByCategory,
  type HomePackApiDto,
} from "../model/mockHome";
import { PackCarousel } from "./PackCarousel";

export function HomePage() {
  const router = useRouter();
  const {
    searchBarRef,
    titleVisible,
    titleTransition,
    forwardOverlay,
    returnOverlay,
    startTransition,
    transitionConfig,
  } = useSearchBarTransition(router);

  const nickname = "홍길동";
  const onFilterClick = () => router.push("/filter-search");

  const [selectedTag, setSelectedTag] = React.useState<Tag>(TAGS[0]);
  const newPacks = PACKS_BY_TAG[selectedTag] ?? [];

  const [greeting, setGreeting] = React.useState<Greeting>(() => MAIN_GREETINGS[0]);
  React.useEffect(() => {
    setGreeting(pickRandomGreeting());
  }, []);

  //  API 응답(목데이터) -> 카테고리별 묶기
  const categoryMap = React.useMemo(() => groupByCategory(MOCK_HOME_PACKS_API), []);

  // 온보딩 선택 카테고리 순서대로 섹션 구성 + PackCardData로 매핑
  const sections = React.useMemo(() => {
    return MOCK_ONBOARDING_CATEGORIES.map((category: string) => {
      const list: HomePackApiDto[] = categoryMap.get(category) ?? [];

      const packs: PackCardData[] = list.map((p) => ({
        id: String(p.id),
        tag: p.contextCategory,
        itemCount: p.items,
        title: p.title,
        author: p.nickname,
        liked: false,
      }));

      return {
        category,
        title: getCategoryTitle(category),
        packs,
      };
    }).filter((s: { packs: PackCardData[] }) => s.packs.length > 0);
  }, [categoryMap]);

  return (
    <div className="min-h-dvh bg-background-alternative2 pt-12 px-5 pb-35">
      <motion.div
        initial={false}
        animate={{ opacity: titleVisible ? 1 : 0, y: titleVisible ? 0 : -8 }}
        transition={titleTransition}
        className="mb-10 flex items-start justify-between gap-4"
      >
        <div>
          <h1 className="type-heading1 text-label-default">
            <span className="text-primary-normal">{nickname}</span>
            {greeting.suffix}
            <br />
            {greeting.line2}
          </h1>
        </div>
        <div className="shrink-0">
          <div className="h-14 w-14 rounded-full bg-neutral-900" />
        </div>
      </motion.div>

      <div ref={searchBarRef} className="mt-6">
        <HomeSearchHeader onSearchBarClick={startTransition} onFilterClick={onFilterClick} />
      </div>

      <SearchBarOverlay forward={forwardOverlay} return={returnOverlay} config={transitionConfig} />

      <section className="mt-8 space-y-10">
        {sections.map((s) => (
          <div key={s.category}>
            <h2 className="text-[18px] font-bold text-neutral-900">{s.title}</h2>
            <PackCarousel packs={s.packs} />
          </div>
        ))}

        <div>
          <h2 className="text-[18px] font-bold text-neutral-900">지금 등록된 따끈따끈한 신상 팩</h2>

          <div className="mt-6 -mx-5 px-5 overflow-x-auto">
            <div className="flex gap-2 w-max pb-2">
              {TAGS.map((t) => (
                <Tag1Btn
                  key={t}
                  mode="btn"
                  variant={t === selectedTag ? "primary" : "unpressed"}
                  onClick={() => setSelectedTag(t)}
                >
                  {t}
                </Tag1Btn>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-common-0 bg-common-0 overflow-hidden">
            {newPacks.map((item) => (
              <button
                key={item.id}
                type="button"
                className="w-full text-left px-4 py-4 flex items-center gap-4 border-b border-neutral-200 last:border-b-0"
              >
                <div className="h-12 w-12 rounded-xl bg-neutral-900 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="type-headline2 text-neutral-900 truncate">{item.title}</p>
                  <p className="text-label-subtle type-caption1 truncate">{item.nickname}</p>
                </div>
                <IcSvgArrowRightSmall className="w-8 h-8 text-label-subtle shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}