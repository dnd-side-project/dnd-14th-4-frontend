"use client";

import * as React from "react";
import { ItemCard } from "@/shared/ui/item/ItemCard";
import { PackCard, type PackCardData } from "@/shared/ui/item/PackCard";
import { MOCK_PACK_CARDS } from "@/features/search/model/mock";
import TabItem from "@/shared/ui/TabItem";
import { useWishlist } from "@/entities/wishlist/model/useWishlist";
import { useUserStore, isProfileDefaultColor } from "@/entities/user/model";
import { PROFILE_COLOR_CLASS } from "@/views/my-page/ui/MyPage";

type ActiveTab = "item" | "pack";

export default function WishListPage() {
  const { user } = useUserStore();
  const nickname = user?.name ?? "사용자";
  const profileImageUrl = user?.profileImageUrl;
  const profileInitial = nickname.charAt(0).toUpperCase();

  const { data: wishlist, isLoading } = useWishlist();

  const [activeTab, setActiveTab] = React.useState<ActiveTab>("item");
  const isSelectMode = false;
  const [checkedIds, setCheckedIds] = React.useState<Set<string>>(new Set());

  const items = React.useMemo(() => {
    if (!wishlist) return [];

    return wishlist.map((it) => ({
      id: it.id,
      brandName: it.brandName,
      productName: it.productName,
      reviewImagePaths: it.reviewImagePaths,
      satisfaction: it.satisfaction,
      usePeriod: it.usePeriod,
      purchaseLocation: it.purchaseLocation,
      tags: it.tags,
      liked: true,
    }));
  }, [wishlist]);

  const packs: PackCardData[] = React.useMemo(() => {
    const base = MOCK_PACK_CARDS as unknown as PackCardData[];
    return base.map((p) => ({ ...p, liked: true }));
  }, []);

  const onSelect = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (isLoading) return <div className="p-10 text-center">로딩 중...</div>;

  return (
    <main className="min-h-dvh bg-background-normal px-5 pt-12 pb-28">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="type-heading1 text-label-default">
            <span className="text-primary-normal">{nickname}</span>님의
            <br />
            위시리스트
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
              className={`h-14 w-14 rounded-full flex items-center justify-center text-white font-bold ${
                profileImageUrl && isProfileDefaultColor(profileImageUrl)
                  ? PROFILE_COLOR_CLASS[profileImageUrl] ?? "bg-neutral-300"
                  : "bg-neutral-900"
              }`}
            >
              {profileInitial || "?"}
            </div>
          )}
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


      <section className="space-y-6">
        {activeTab === "item" ? (
          <ul className="space-y-6">
            {items.length > 0 ? (
              items.map((it) => (
                <li key={it.id}>
                  <ItemCard
                    {...it}
                    showLike
                    isSelectMode={isSelectMode}
                    isChecked={checkedIds.has(String(it.id))}
                    onSelect={onSelect}
                    onMoreClick={() => { }}
                    onDetailClick={() => { }}
                  />
                </li>
              ))
            ) : (
              <div className="py-20 text-center text-label-assistive">
                위시리스트에 담긴 아이템이 없어요.
              </div>
            )}
          </ul>
        ) : (
          <ul className="space-y-6">
            {packs.slice(0, 3).map((p) => (
              <li key={p.id}>
                <PackCard {...p} onMoreClick={() => { }} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}