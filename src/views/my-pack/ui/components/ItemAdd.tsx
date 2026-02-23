"use client";

import { useMemo, useState } from "react";
import { MOCK_PACK_CARDS } from "@/features/search/model/mock";
import { BackHeader } from "@/shared/ui/BackHeader";
import { FixedBottomButton } from "@/shared/ui/FixedBottomButton";
import { ItemCard } from "@/shared/ui/item/ItemCard";
import { PackCard } from "@/shared/ui/item/PackCard";
import { useRouter } from "next/navigation";
import { useGetItems } from "@/entities/item/model/useGetItems";
import type { Item } from "@/views/pack-create/entities/item/model/types";
import {
  mapApiItemToPackCreateItem,
  mapPackCreateItemToItemCardProps,
} from "@/views/pack-create/shared/model/itemMappers";

interface ItemAddProps {
  onBack: () => void;
  addMode?: "item" | "pack";
  /** addMode "item"일 때 표시할 아이템 목록. 없으면 API -> mapper 결과 사용 */
  itemsToAdd?: Item[];
  /** addMode "item" 진입 시 초기 체크할 아이템 id 목록 */
  initialSelectedItemIds?: string[];
  /** addMode "item"에서 '추가하기' 클릭 시 선택된 아이템 목록 반환 */
  onAddItems?: (items: Item[]) => void;
}

export function ItemAdd({
  onBack,
  addMode = "pack",
  itemsToAdd,
  initialSelectedItemIds = [],
  onAddItems,
}: ItemAddProps) {
  const router = useRouter();
  const { data: apiItems } = useGetItems();

  const [selectedPackId, setSelectedPackId] = useState<string | null>(null);

  // ✅ 초기값은 여기서만 1회 반영 (props 변화 추적 X)
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>(
    initialSelectedItemIds
  );

  const mappedApiItems = useMemo(
    () => (apiItems ?? []).map(mapApiItemToPackCreateItem),
    [apiItems]
  );

  const selectableItems = useMemo(
    () => (addMode === "item" ? itemsToAdd ?? mappedApiItems : []),
    [addMode, itemsToAdd, mappedApiItems]
  );

  const handleSelectPack = (id: string) => {
    setSelectedPackId((prev) => (prev === id ? null : id));
  };

  const handleSelectItem = (id: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAction = () => {
    if (addMode === "pack") {
      if (!selectedPackId) return;
      router.push(`/pack/${selectedPackId}?mode=add`);
      return;
    }

    // addMode === "item"
    const selectedItems = selectableItems.filter((item) =>
      selectedItemIds.includes(item.id)
    );
    onAddItems?.(selectedItems);
    onBack();
  };

  const isDisabled =
    (addMode === "pack" && !selectedPackId) ||
    (addMode === "item" && selectedItemIds.length === 0);

  return (
    <>
      <BackHeader onBack={onBack} />
      <div className="flex flex-col px-6 pb-24">
        <div className="flex flex-col gap-4">
          {addMode === "item"
            ? selectableItems.map((item, index) => {
                const cardProps = mapPackCreateItemToItemCardProps(item, index);
                return (
                  <ItemCard
                    key={item.id}
                    {...cardProps}
                    showLike={false}
                    isSelectMode={true}
                    isChecked={selectedItemIds.includes(item.id)}
                    onSelect={() => handleSelectItem(item.id)}
                  />
                );
              })
            : apiItems?.map((item) => <ItemCard key={item.id} {...item} />)}
        </div>

        {addMode === "pack" && (
          <div className="mt-10">
            <p className="type-heading2 text-label-default">
              어떤 팩에 추가하고 싶나요?
            </p>

            <div className="mt-4 flex flex-col gap-3">
              {MOCK_PACK_CARDS.map((card) => (
                <PackCard
                  key={card.id}
                  {...card}
                  isSelectMode={true}
                  isChecked={selectedPackId === card.id}
                  onSelect={handleSelectPack}
                  showLikeBtn={false}
                />
              ))}
            </div>
          </div>
        )}

        <FixedBottomButton onClick={handleAction} disabled={isDisabled}>
          {addMode === "pack" ? "다음" : "추가하기"}
        </FixedBottomButton>
      </div>
    </>
  );
}