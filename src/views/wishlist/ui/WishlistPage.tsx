"use client";

import * as React from "react";

import { ItemCard, MOCK_ITEM_CARDS, type ItemCardData } from "@/shared/ui/item/ItemCard";
import { PackCard, type PackCardData } from "@/shared/ui/item/PackCard";
import { MOCK_PACK_CARDS } from "@/features/search/model/mock";
import TabItem from "@/shared/ui/TabItem";

type ActiveTab = "item" | "pack";

export default function WishListPage() {

  const nickname = "홍길동"; // TODO: 유저 닉네임 연결

  const [activeTab, setActiveTab] = React.useState<ActiveTab>("item");
  const [isSelectMode,] = React.useState(false);
  const [checkedIds, setCheckedIds] = React.useState<Set<string>>(new Set());

  const items: ItemCardData[] = React.useMemo(() => {
    const base = [
      ...MOCK_ITEM_CARDS,
      { ...MOCK_ITEM_CARDS[0], id: "2" },
      { ...MOCK_ITEM_CARDS[0], id: "3" },
    ];

    return base.map((it) => ({
      ...it,
      liked: true,
    }));
  }, []);

  const packs: PackCardData[] = React.useMemo(() => {
    const base = MOCK_PACK_CARDS as unknown as PackCardData[];
    return base.map((p) => ({
      ...p,
      liked: true, 
    }));
  }, []);


  const onSelect = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
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

        <div className="shrink-0">
          <div className="h-14 w-14 rounded-full bg-neutral-900" />
        </div>
      </div>
      <header className="mt-6 mb-6 flex items-center justify-center">
        <div role="tablist" className="flex gap-7 w-37">
          <div className="flex-1">
            <TabItem isActive={activeTab === "item"} onClick={() => setActiveTab("item")}>
              아이템
            </TabItem>
          </div>
          <div className="flex-1">
            <TabItem isActive={activeTab === "pack"} onClick={() => setActiveTab("pack")}>
              팩
            </TabItem>
          </div>
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
                  onMoreClick={() => {}}
                  onDetailClick={() => {}}
                />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-6">
            {packs.slice(0, 3).map((p) => (
              <li key={p.id}>
                <PackCard {...p} onMoreClick={() => {}} />
              </li>
            ))}
          </ul>
        )}
      </section>

     
    </main>
  );
}