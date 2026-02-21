"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { IcSvgFilter } from "@/shared/icons";
import { ItemCard, MOCK_ITEM_CARDS, type ItemCardData } from "@/shared/ui/item/ItemCard";
import { PackCard, type PackCardData } from "@/shared/ui/item/PackCard"; // 경로는 프로젝트에 맞게
import { MOCK_PACK_CARDS } from "@/features/search/model/mock"; // pack 목데이터 쓰는 곳에 맞게

// 이미 프로젝트에 TabItem이 있다면 아래 import로 교체하세요.
// import { TabItem } from "@/shared/ui/TabItem";
function TabItem({
  children,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={[
        "type-headline2 pb-3 transition-colors",
        isActive ? "text-label-default border-b-2 border-black" : "text-label-subtle border-b-2 border-transparent",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

type ActiveTab = "item" | "pack";

export default function WishListPage() {
  const router = useRouter();

  const nickname = "홍길동"; // TODO: 유저 닉네임 연결

  const [activeTab, setActiveTab] = React.useState<ActiveTab>("item");
  const [isSelectMode, setIsSelectMode] = React.useState(false);

  const [checkedIds, setCheckedIds] = React.useState<Set<string>>(new Set());

  const items: ItemCardData[] = React.useMemo(() => {
    // 실제 API 붙이면 여기 교체
    return [
      ...MOCK_ITEM_CARDS,
      { ...MOCK_ITEM_CARDS[0], id: "2", liked: true },
      { ...MOCK_ITEM_CARDS[0], id: "3" },
    ];
  }, []);

  const packs: PackCardData[] = React.useMemo(() => {
    // 기존 MOCK_PACK_CARDS가 PackCardData 형태라면 그대로 OK
    // 아니라면 여기서 매핑
    return MOCK_PACK_CARDS as unknown as PackCardData[];
  }, []);

  const toggleSelectMode = () => {
    setIsSelectMode((prev) => {
      const next = !prev;
      // 선택모드 종료 시 체크 해제(원하면 유지로 변경 가능)
      if (!next) setCheckedIds(new Set());
      return next;
    });
  };

  const onSelect = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const goFilter = () => {
    // 필요 시: router.push("/filter-wishlist") 등
    router.push("/filter-search");
  };

  return (
    <main className="min-h-dvh bg-background-alternative2 px-5 pt-12 pb-28">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="type-heading1 text-label-default">
            <span className="text-primary-normal">{nickname}</span>님의
            <br />
            위시리스트
          </h1>
        </div>

        {/* 프로필 임시 */}
        <div className="shrink-0">
          <div className="h-14 w-14 rounded-full bg-neutral-900" />
        </div>
      </div>

      {/* 탭 + 필터/선택 */}
      <header className="mt-6 mb-6 flex items-center justify-between">
        {/* 왼쪽 여백(이미지에서 좌측이 비어있어서 균형용) */}
        <div className="w-12 h-12" />

        {/* 가운데 탭 */}
        <div role="tablist" className="flex gap-7">
          <TabItem isActive={activeTab === "item"} onClick={() => setActiveTab("item")}>
            아이템
          </TabItem>
          <TabItem isActive={activeTab === "pack"} onClick={() => setActiveTab("pack")}>
            팩
          </TabItem>
        </div>

        {/* 오른쪽 액션 */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goFilter}
            aria-label="필터"
            className="grid h-10 w-10 place-items-center rounded-xl"
          >
            <IcSvgFilter width={24} height={24} className="text-label-subtle" />
          </button>

          <button
            type="button"
            onClick={toggleSelectMode}
            className={[
              "type-label1 transition-colors",
              isSelectMode ? "text-primary-normal font-bold" : "text-label-subtle",
            ].join(" ")}
          >
            {isSelectMode ? "취소" : "선택"}
          </button>
        </div>
      </header>

      {/* 리스트 */}
      <section className="space-y-6">
        {activeTab === "item" ? (
          <ul className="space-y-6">
            {items.map((it) => (
              <li key={it.id}>
                <ItemCard
                  {...it}
                  showLike
                  isSelectMode={isSelectMode}
                  isChecked={checkedIds.has(it.id)}
                  onSelect={onSelect}
                  onMoreClick={() => {
                    // TODO: 더보기 바텀시트
                  }}
                  onDetailClick={() => {
                    // TODO: 상세 이동
                    // router.push(`/item/${it.id}`);
                  }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-6">
            {packs.slice(0, 3).map((p) => (
              <li key={p.id}>
                <PackCard
                  {...p}
                  onMoreClick={() => {
                    // TODO: 더보기 바텀시트
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 플로팅 + 버튼 */}
      <button
        type="button"
        aria-label="추가"
        onClick={() => {
          // TODO: 생성/추가 페이지로
          // router.push("/create");
        }}
        className="fixed bottom-24 right-6 h-24 w-24 rounded-full bg-primary-normal shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
      >
        <span className="block text-white text-[56px] leading-none translate-y-[-2px]">+</span>
      </button>
    </main>
  );
}