"use client";

import { useState } from "react";
import { ItemForm } from "@/features/items/ui/ItemForm";
import { BackHeader } from "@/shared/ui/BackHeader";
import { useRouter, useParams } from "next/navigation";
import { Modal } from "@/shared/ui/Modal";
import { useGetItemDetail } from "@/entities/item/model/useGetItemDetail";

export default function ItemEditPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string; // URL 파라미터에서 ID 추출

    const [isExitModalOpen, setIsExitModalOpen] = useState(false);

    const { data: itemData, isLoading } = useGetItemDetail(id);

    const handleBackClick = () => {
        setIsExitModalOpen(true);
    };

    const handleConfirmExit = () => {
        setIsExitModalOpen(false);
        router.back();
    };

    if (isLoading) return <div className="p-10 text-center">불러오는 중</div>;
    return (
        <>
            <BackHeader onBack={handleBackClick} />
            <main className="max-w-md mx-auto px-5 pb-[100px]">
                <ItemForm isEdit initialData={itemData} />
            </main>

            <Modal
                isOpen={isExitModalOpen}
                onClose={() => setIsExitModalOpen(false)}
                title="수정을 그만둘까요?"
                description="변경된 내용은 저장되지 않아요."
                onConfirm={handleConfirmExit}
            />
        </>
    );
}