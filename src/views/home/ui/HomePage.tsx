"use client";

import React from "react";
import { LayoutGroup, motion } from "framer-motion";
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

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const headerContainer = {
  hidden: { opacity: 0, y: -10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: EASE_OUT,
      staggerChildren: 0.06,
    },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: -6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: EASE_OUT },
  },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: EASE_OUT },
  },
};

export function HomePage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const {
    searchBarRef,
    titleVisible,
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

  // 태그 로딩 직후 바로 첫 태그를 선택된 것으로 간주해, 목록이 한 템포 늦게 뜨는 느낌을 줄임
  const effectiveSelectedTag = selectedTag || tags[0] || "";
  const newPacks: HomePackApiDto[] = rawByCategory[effectiveSelectedTag] ?? [];
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
          liked: pack.isPackInWishList,
          showLikeBtn: pack.nickname !== nickname,
        })),
      }));
  }, [recommendationData, nickname]);

  const showRecommendationSections =
    !isRecommendationLoading &&
    !isRecommendationError &&
    recommendationSections.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: EASE_OUT }}
      className="min-h-dvh bg-background-alternative pt-5 px-5 pb-35"
    >
      <motion.div
        initial="hidden"
        animate={titleVisible ? "show" : "hidden"}
        variants={headerContainer}
        className="mb-8 flex items-start justify-between gap-4"
      >
        <motion.div variants={headerItem}>
          <h1 className="type-heading1 text-label-default">
            <span className="text-primary-normal">{nickname}</span>
            {greeting.suffix}
            <br />
            {greeting.line2}
          </h1>
        </motion.div>

        <motion.div variants={headerItem} className="shrink-0">
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
        </motion.div>
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

      {showRecommendationSections && (
        <section className="mt-8">
          {recommendationSections.map((section) => (
            <motion.div
              key={section.categoryId}
              className="mb-10 last:mb-0"
              variants={sectionReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              <h2 className="text-[18px] font-bold text-neutral-900">
                {section.title}
              </h2>
              <PackCarousel packs={section.packs} />
            </motion.div>
          ))}
        </section>
      )}

      <section className="mt-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-neutral-900">
            지금 등록된 따끈따끈한 신상 팩
          </h2>

        </div>

        <div className="mt-6 -mx-5 px-5 overflow-x-auto">
          <LayoutGroup>
            <div className="relative flex gap-2 w-max pb-2">


              {!isLoading &&
                !isError &&
                tags.map((t) => {
                  const selected = t === effectiveSelectedTag;

                  return (
                    <div key={t} className="relative">
                      {selected && (
                        <motion.div
                          layoutId="tag-pill"
                          className="absolute inset-0 rounded-full bg-primary-normal/10"
                          style={{ zIndex: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 40,
                          }}
                        />
                      )}

                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.12 }}
                        className="relative"
                        style={{ zIndex: 1 }}
                      >
                        <Tag1Btn
                          mode="btn"
                          variant={selected ? "primary" : "unpressed"}
                          onClick={() => setSelectedTag(t)}
                        >
                          {t}
                        </Tag1Btn>
                      </motion.div>
                    </div>
                  );
                })}

              {isError && (
                <div className="text-sm text-red-500 px-1">
                  태그를 불러오지 못했습니다.
                </div>
              )}
            </div>
          </LayoutGroup>
        </div>

        <div className="mt-4 rounded-xl border border-common-0 bg-common-0 overflow-hidden">
          {isError ? (
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
    </motion.div>
  );
}