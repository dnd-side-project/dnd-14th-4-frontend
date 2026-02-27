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
import { useUserStore } from "@/entities/user/model/useUserStore";
import { isProfileDefaultColor } from "@/entities/user/model";
import { PROFILE_COLOR_CLASS } from "@/views/my-page/ui/MyPage";

import { useTrendingTags } from "../model/useTrendingTags";
import type { HomePackApiDto } from "../model/mockHome";
import { RECOMMENDATION_TITLE_BY_CATEGORY_ID, useRecommendedPacks } from "../model/useRecommendedPacks";
import { PackCarousel } from "./PackCarousel";

export function HomePage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const {
    searchBarRef,
    titleVisible,
    titleTransition,
    forwardOverlay,
    returnOverlay,
    startTransition,
    transitionConfig,
  } = useSearchBarTransition(router);

  const nickname = user?.name ?? "사용자";
  const profileImageUrl = user?.profileImageUrl;
  const profileInitial = nickname.charAt(0).toUpperCase();
  const onFilterClick = () => router.push("/filter-search");

  const [greeting, setGreeting] = React.useState<Greeting>(
    () => MAIN_GREETINGS[0]
  );

  React.useEffect(() => {
    setGreeting(pickRandomGreeting());
  }, []);

  const { data, isLoading, isError } = useTrendingTags();
  const {
    data: recommendationData,
    isLoading: isRecommendationLoading,
    isError: isRecommendationError,
  } = useRecommendedPacks();

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
  const recommendationSections = React.useMemo(() => {
    if (!recommendationData) return [];

    return Object.entries(recommendationData)
      .sort(([a], [b]) => Number(a) - Number(b))
      .filter(([, packs]) => packs.length > 0)
      .slice(0, 2)
      .map(([categoryId, packs]) => ({
        categoryId,
        title:
          RECOMMENDATION_TITLE_BY_CATEGORY_ID[categoryId] ??
          "추천 팩",
        packs: packs.map((pack) => ({
          id: pack.id,
          tag: pack.contextCategory,
          itemCount: pack.items,
          title: pack.title,
          author: pack.nickname,
          imageSrc: pack.imageUrl,
          imageAlt: `${pack.title} 이미지`,
        })),
      }));
  }, [recommendationData]);

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

        <div className="shrink-0">
          {profileImageUrl && !isProfileDefaultColor(profileImageUrl) ? (
            <div
              className="h-14 w-14 rounded-full bg-neutral-300 bg-cover bg-center"
              style={{ backgroundImage: `url(${profileImageUrl})` }}
              aria-label={`${nickname} 프로필 이미지`}
              role="img"
            />
          ) : (
            <div
              className={`h-14 w-14 rounded-full flex items-center justify-center text-white font-bold ${profileImageUrl && isProfileDefaultColor(profileImageUrl)
                ? PROFILE_COLOR_CLASS[profileImageUrl] ?? "bg-neutral-300"
                : "bg-neutral-900"
                }`}
            >
              {profileInitial || "?"}
            </div>
          )}
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
      <section className="mt-8">
        {isRecommendationLoading && (
          <div className="text-sm text-neutral-500">추천 팩을 불러오는 중...</div>
        )}

        {isRecommendationError && (
          <div className="text-sm text-red-500">추천 팩을 불러오지 못했습니다.</div>
        )}

        {!isRecommendationLoading &&
          !isRecommendationError &&
          recommendationSections.map((section) => (
            <div key={section.categoryId} className="mb-10 last:mb-0">
              <h2 className="text-[18px] font-bold text-neutral-900">{section.title}</h2>
              <PackCarousel packs={section.packs} />
            </div>
          ))}
      </section>

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
                onClick={() => router.push(`/pack/${item.id}`)}
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