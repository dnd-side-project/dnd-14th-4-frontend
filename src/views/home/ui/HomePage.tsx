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

const TAGS = ["공부/시험", "면접/취준", "업무/취준", "약속/데이트", "운동/산책"] as const;

type Tag = (typeof TAGS)[number];

type PackItem = {
  id: string;
  title: string;
  nickname: string;
};

const PACKS_BY_TAG: Record<Tag, PackItem[]> = {
  "공부/시험": [
    { id: "study-1", title: "공부 필수템 20...", nickname: "닉네임은열자가최대야" },
    { id: "study-2", title: "시험 전날 챙김 20...", nickname: "닉네임은열자가최대야" },
    { id: "study-3", title: "독서실 가방 20...", nickname: "닉네임은열자가최대야" },
  ],
  "면접/취준": [
    { id: "job-1", title: "면접 당일 필수 20...", nickname: "닉네임은열자가최대야" },
    { id: "job-2", title: "자소서/포트 20...", nickname: "닉네임은열자가최대야" },
    { id: "job-3", title: "정장 주머니 20...", nickname: "닉네임은열자가최대야" },
  ],
  "업무/취준": [
    { id: "work-1", title: "출근 가방 루틴 20...", nickname: "닉네임은열자가최대야" },
    { id: "work-2", title: "회의용 파우치 20...", nickname: "닉네임은열자가최대야" },
    { id: "work-3", title: "노트북 수납 20...", nickname: "닉네임은열자가최대야" },
  ],
  "약속/데이트": [
    { id: "date-1", title: "약속 전 필수 20...", nickname: "닉네임은열자가최대야" },
    { id: "date-2", title: "미니백 구성 20...", nickname: "닉네임은열자가최대야" },
    { id: "date-3", title: "향/메이크업 20...", nickname: "닉네임은열자가최대야" },
  ],
  "운동/산책": [
    { id: "walk-1", title: "오운완 필수팩 20...", nickname: "닉네임은열자가최대야" },
    { id: "walk-2", title: "러닝 장비팩 20...", nickname: "닉네임은열자가최대야" },
    { id: "walk-3", title: "산책 루틴팩 20...", nickname: "닉네임은열자가최대야" },
  ],
};

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
  const packs = PACKS_BY_TAG[selectedTag] ?? [];

  return (
    <div className="min-h-dvh bg-background-alternative2 pt-12 px-5">
      <motion.div
        initial={false}
        animate={{
          opacity: titleVisible ? 1 : 0,
          y: titleVisible ? 0 : -8,
        }}
        transition={titleTransition}
        className="mb-10 flex items-start justify-between gap-4"
      >
        <div>
          <h1 className="type-heading1 text-label-default">
            <span className="text-primary-normal">{nickname}님</span>의
            <br />
            애착템을 소개해주세요!
          </h1>
        </div>

        {/* TODO: 프로필 이미지 추가 */}
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

      <section className="mt-8">
        <h2 className="text-[18px] font-bold text-neutral-900">
          운동 효과 UP! 오운완 인증 필수팩
        </h2>
        <h2 className="text-[18px] font-bold text-neutral-900">
          장인은 장비빨, 취미생활 부스트팩
        </h2>
        <h2 className="text-[18px] font-bold text-neutral-900">
          지금 등록된 따끈따끈한 신상 팩
        </h2>

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
          {packs.map((item) => (
            <button
              key={item.id}
              type="button"
              className="w-full text-left px-4 py-4 flex items-center gap-4 border-b border-neutral-200 last:border-b-0"
              onClick={() => {
                // router.push(`/pack/${item.id}`);
              }}
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
          ))}
        </div>

        {/* 플로팅 + */}
       
      </section>
    </div>
  );
}