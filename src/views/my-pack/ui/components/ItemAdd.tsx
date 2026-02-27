"use client"

import { useMemo, useState } from "react";
import { MOCK_PACK_CARDS } from "@/features/search/model/mock";
import { BackHeader } from "@/shared/ui/BackHeader";
import { FixedBottomButton } from "@/shared/ui/FixedBottomButton";
import { ItemCard } from "@/shared/ui/item/ItemCard";
import { PackCard } from "@/shared/ui/item/PackCard";
import { useRouter } from "next/navigation";
import { useGetItems } from "@/entities/item/model/useGetItems";
import type { Item as ApiItem } from "@/entities/item/model/types";
import type { Item as PackCreateItem } from "@/views/pack-create/entities/item/model/types";
import { mapApiItemToPackCreateItem } from "@/views/pack-create/shared/model/itemMappers";

interface ItemAddProps {
    onBack: () => void;
    addMode?: "item" | "pack";
    initialSelectedItemIds?: string[];
    onAddItems?: (items: PackCreateItem[]) => void;
}

export function ItemAdd({
    onBack,
    addMode = "pack",
    initialSelectedItemIds,
    onAddItems,
}: ItemAddProps) {
    const router = useRouter();
    const [selectedPackId, setSelectedPackId] = useState<number | null>(null);
    const { data: items } = useGetItems();
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>(
        initialSelectedItemIds ?? []
    );
    const handleSelectPack = (id: number) => {
        setSelectedPackId((prev) => (prev === id ? null : id));
    };
    const toggleSelectItem = (id: string) => {
        setSelectedItemIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    const selectedPackCreateItems = useMemo<PackCreateItem[]>(() => {
        if (!items) return [];
        const selected = items.filter((item: ApiItem) => selectedItemIds.includes(String(item.id)));
        return selected.map(mapApiItemToPackCreateItem);
    }, [items, selectedItemIds]);

    const handleAction = () => {
        if (addMode === "pack") {
            if (selectedPackId !== null) {
                router.push(`/pack/${selectedPackId}?mode=add`);
            }
        } else {
            if (onAddItems) {
                onAddItems(selectedPackCreateItems);
                return;
            }
            console.log("아이템이 내 보관함에 추가되었습니다!");
            onBack();
        }
    };

    return (
        <>
            <BackHeader onBack={onBack} />
            <div className="flex flex-col px-6 pb-24">

                <div className="flex flex-col gap-4">
                    {items?.map((item) => (
                        <ItemCard
                            key={item.id}
                            {...item}
                            isSelectMode={addMode === "item" && !!onAddItems}
                            isChecked={selectedItemIds.includes(String(item.id))}
                            onSelect={(id) => toggleSelectItem(id)}
                        />
                    ))}
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

                <FixedBottomButton
                    onClick={handleAction}
                    disabled={
                        (addMode === "pack" && selectedPackId === null) ||
                        (addMode === "item" && !!onAddItems && selectedItemIds.length === 0)
                    }
                >
                    {addMode === "pack" ? "다음" : "추가하기"}
                </FixedBottomButton>
            </div>
        </>
    );
}