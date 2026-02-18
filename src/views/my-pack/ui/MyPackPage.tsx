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

export const MyPackPage = () => {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("item");
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
                    {!isSelectMode && <IcSvgFilter width={24} height={24} className="text-label-subtle" />}
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


            <BottomSheet
                isOpen={isBottomSheetOpen}
                onClose={() => setIsBottomSheetOpen(false)}
                onEdit={handleEditRedirect}
                onDelete={onClickDeleteMenu}
            />

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="아이템을 삭제할까요?"
                confirmText="삭제하기"
                onConfirm={handleFinalDelete}
            />
        </div>
    );
};