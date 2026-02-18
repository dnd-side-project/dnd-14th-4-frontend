"use client";

import { IcSvgFilter } from "@/shared/icons";
import TabItem from "@/shared/ui/TabItem";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ 1. useRouter 불러오기
import { MOCK_PACK_CARDS, PackCard } from "@/shared/ui/item/PackCard";
import { ItemCard, MOCK_ITEM_CARDS } from "@/shared/ui/item/ItemCard";
import { BottomSheet } from "@/shared/ui/BottomSheet";
import { appToast } from "@/shared/utils/toast";
import { Modal } from "@/shared/ui/Modal";
import { FixedBottomButton } from "@/shared/ui/FixedBottomButton";
import { ItemBox, ItemData } from "@/shared/ui/item/ItemBox";
import { MOCK_ITEMS } from "@/features/search/model/mock";

export const MyPackPage = () => {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("item");
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [isAddOpen, setIsAddOpen] = useState(false);

    const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);

    const handleDetailClick = (item: ItemData) => {
        setSelectedItem(item);
        setIsAddOpen(true);
    };


    const toggleSelectMode = () => {
        setIsSelectMode((prev) => !prev);
        setSelectedIds([]);
    };

    const handleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const onClickDeleteMenu = () => {
        setIsBottomSheetOpen(false);
        setIsDeleteModalOpen(true);
    };

    const handleFinalDelete = () => {
        setIsDeleteModalOpen(false);
        appToast.success("삭제되었습니다.");
    };

    const handleEditRedirect = () => {
        setIsBottomSheetOpen(false);
        router.push("/items-edit");
    };

    return (
        <div className="px-6">
            <header className="flex items-center justify-between mt-16 mb-10">
                <div className="w-12 h-12 bg-common-100 rounded-full" />
                <div className="flex gap-7 w-37">
                    <TabItem isActive={activeTab === "item"} onClick={() => { setActiveTab("item"); setIsSelectMode(false); }}>
                        아이템
                    </TabItem>
                    <TabItem isActive={activeTab === "pack"} onClick={() => { setActiveTab("pack"); setIsSelectMode(false); }}>
                        팩
                    </TabItem>
                </div>
                <div className="flex items-center gap-3">
                    <IcSvgFilter width={24} height={24} className="text-label-subtle" />
                    <button
                        onClick={toggleSelectMode}
                        className={`type-label1 transition-colors ${isSelectMode ? "text-primary-normal font-bold" : "text-label-subtle"}`}
                    >
                        {isSelectMode ? "취소" : "선택"}
                    </button>
                </div>
            </header>

            <div className="flex flex-col gap-3">
                {activeTab === "item" &&
                    MOCK_ITEM_CARDS.map((card) => (
                        <ItemCard
                            key={card.id}
                            {...card}
                            isSelectMode={isSelectMode}
                            isChecked={selectedIds.includes(card.id)}
                            onSelect={handleSelect}
                            onDetailClick={() => handleDetailClick(MOCK_ITEMS[0])}
                            onMoreClick={() => setIsBottomSheetOpen(true)}
                        />
                    ))
                }
                {activeTab === "pack" &&
                    MOCK_PACK_CARDS.map((card) => (
                        <PackCard key={card.id} {...card} onMoreClick={() => setIsBottomSheetOpen(true)} />
                    ))
                }
            </div>

            {activeTab === "item" && isSelectMode && selectedIds.length > 0 && (
                <FixedBottomButton
                    onClick={() => router.push(`/pack-create?ids=${selectedIds.join(",")}`)}
                >
                    팩 만들기
                </FixedBottomButton>
            )}


            <BottomSheet isOpen={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} >
                <div className="flex flex-col gap-3">
                    <button onClick={handleEditRedirect} className="w-full h-[52px] rounded-[12px] border border-gray-200 text-gray-900 font-medium">
                        수정하기
                    </button>
                    <button onClick={onClickDeleteMenu} className="w-full h-[52px] rounded-[12px] bg-gray-900 text-white font-medium">
                        삭제하기
                    </button>
                </div>
            </BottomSheet>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="아이템을 삭제할까요?"
                confirmText="삭제하기"
                onConfirm={handleFinalDelete}
            />

            <BottomSheet
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}

            >
                <div className="mb-6">
                    {/* 데이터 형식 안맞아서 목업 데이터 넣어놓았음 */}
                    {selectedItem && <ItemBox item={MOCK_ITEMS[0]} />}
                </div>

                {/* btnarea */}
                <div className="flex gap-3">
                    <button className="flex-1 h-[52px] rounded-[12px] bg-beige-100 text-gray-900 font-medium active:bg-beige-200">
                        팩 추가하기
                    </button>
                    <button className="flex-1 h-[52px] rounded-[12px] bg-primary-normal text-white font-medium active:opacity-90">
                        팩 만들기
                    </button>
                </div>
            </BottomSheet>
        </div>
    );
};