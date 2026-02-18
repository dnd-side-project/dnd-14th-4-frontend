"use client";

import { IcSvgFilter } from "@/shared/icons";
import TabItem from "@/shared/ui/TabItem";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ 1. useRouter 불러오기
import { MOCK_PACK_CARDS, PackCard } from "@/shared/ui/item/PackCard";
import { ItemCard } from "@/shared/ui/item/ItemCard";
import { BottomSheet } from "@/shared/ui/BottomSheet";
import { appToast } from "@/shared/utils/toast";
import { Modal } from "@/shared/ui/Modal";

export const MyPackPage = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("item");
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
                    <TabItem isActive={activeTab === "item"} onClick={() => setActiveTab("item")}>아이템</TabItem>
                    <TabItem isActive={activeTab === "pack"} onClick={() => setActiveTab("pack")}>팩</TabItem>
                </div>
                <div className="flex items-center gap-3">
                    <IcSvgFilter width={24} height={24} className="text-label-subtle" />
                    <button className="text-label-subtle type-label1">선택</button>
                </div>
            </header>

            <div className="flex flex-col gap-3">
                {activeTab === "item" &&
                    MOCK_PACK_CARDS.map((card) => (
                        <ItemCard key={card.id} {...card} onMoreClick={() => setIsBottomSheetOpen(true)} />
                    ))
                }

                {activeTab === "pack" &&
                    MOCK_PACK_CARDS.map((card) => (
                        <PackCard key={card.id} {...card} onMoreClick={() => setIsBottomSheetOpen(true)} />
                    ))
                }
            </div>

            <BottomSheet
                isOpen={isBottomSheetOpen}
                onClose={() => setIsBottomSheetOpen(false)}
                onEdit={handleEditRedirect} // ✅ 4. 수정 함수 연결
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