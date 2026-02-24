"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  SearchBarOverlay,
  useSearchBarTransition,
} from "@/features/search/transition";
import { HomeSearchHeader } from "@/widgets/home-search-header/ui/HomeSearchHeader";
import Tag1Btn from "@/shared/ui/Tag1Btn";
import IcSvgArrowRightSmall from "@/shared/icons/ic_arrowrightsmall";

import {
  MAIN_GREETINGS,
  pickRandomGreeting,
  type Greeting,
} from "../model/greeting";

import { useTrendingTags } from "../model/useTrendingTags";
import type { HomePackApiDto } from "../model/mockHome";

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

  // TODO: 실제 로그인 유저 닉네임으로 교체
  const nickname = "홍길동";
  const onFilterClick = () => router.push("/filter-search");

  const [greeting, setGreeting] = React.useState<Greeting>(
    () => MAIN_GREETINGS[0]
  );

  React.useEffect(() => {
    setGreeting(pickRandomGreeting());
  }, []);

  const { data, isLoading, isError } = useTrendingTags();

  const tags = React.useMemo(
    () => data?.tags ?? [],
    [data]
  );
  
  const rawByCategory = React.useMemo(
    () => data?.raw ?? {},
    [data]
  );

  const [selectedTag, setSelectedTag] = React.useState<string>("");

  React.useEffect(() => {
    if (!selectedTag && tags.length > 0) {
      setSelectedTag(tags[0]);
    }
  }, [tags, selectedTag]);

  const newPacks: HomePackApiDto[] = rawByCategory[selectedTag] ?? [];

  return (
    <div className="min-h-dvh bg-background-alternative pt-12 px-5 pb-35">
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

        {/* TODO: 프로필 이미지 */}
        <div className="shrink-0">
          <div className="h-14 w-14 rounded-full bg-neutral-900" />
        </div>
      </motion.div>

      <div ref={searchBarRef} className="mt-6">
        <HomeSearchHeader
          onSearchBarClick={startTransition}
          onFilterClick={onFilterClick}
        />
      </div>

      <SearchBarOverlay
        forward={forwardOverlay}
        return={returnOverlay}
        config={transitionConfig}
      />

      {/* 하단 신상 팩 영역 */}
      <section className="mt-8">
        <h2 className="text-[18px] font-bold text-neutral-900">
          지금 등록된 따끈따끈한 신상 팩
        </h2>

        <div className="mt-6 -mx-5 px-5 overflow-x-auto">
          <div className="flex gap-2 w-max pb-2">
            {isLoading && (
              <div className="text-sm text-neutral-500 px-1">
                태그 불러오는 중...
              </div>
            )}

            {!isLoading &&
              !isError &&
              tags.map((t) => (
                <Tag1Btn
                  key={t}
                  mode="btn"
                  variant={t === selectedTag ? "primary" : "unpressed"}
                  onClick={() => setSelectedTag(t)}
                >
                  {t}
                </Tag1Btn>
              ))}

            {isError && (
              <div className="text-sm text-red-500 px-1">
                태그를 불러오지 못했습니다.
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-common-0 bg-common-0 overflow-hidden">
          {isLoading ? (
            <div className="px-4 py-6 text-sm text-neutral-500">
              데이터를 불러오는 중...
            </div>
          ) : isError ? (
            <div className="px-4 py-6 text-sm text-red-500">
              데이터를 불러오지 못했습니다.
            </div>
          ) : newPacks.length === 0 ? (
            <div className="px-4 py-6 text-sm text-neutral-500">
              아직 등록된 팩이 없어요.
            </div>
          ) : (
            newPacks.map((item) => (
              <button
                key={item.id}
                type="button"
                className="w-full text-left px-4 py-4 flex items-center gap-4 border-b border-neutral-200 last:border-b-0"
                onClick={() => router.push(`/packs/${item.id}`)}
              >
                <div className="h-12 w-12 rounded-xl bg-neutral-900 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="type-headline2 text-neutral-900 truncate">
                    {item.title}
                  </p>
                  <p className="text-label-subtle type-caption1 truncate">
                    {item.nickname}
                  </p>
                </div>
                <IcSvgArrowRightSmall className="w-8 h-8 text-label-subtle shrink-0" />
              </button>
            ))
          )}
        </div>
      </section>
    </div>
  );
}