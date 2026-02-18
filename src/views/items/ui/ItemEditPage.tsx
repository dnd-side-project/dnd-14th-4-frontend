"use client";

import { useState } from "react";
import { ItemForm } from "@/features/items/ui/ItemForm";
import { MOCK_ITEM_EDIT_DATA } from "@/features/search/model/mock";
import { BackHeader } from "@/shared/ui/BackHeader";
import { useRouter } from "next/navigation";
import { Modal } from "@/shared/ui/Modal";

export default function ItemEditPage() {
    const router = useRouter();
    const [isExitModalOpen, setIsExitModalOpen] = useState(false);

    const handleBackClick = () => {
        setIsExitModalOpen(true);
    };

    const handleConfirmExit = () => {
        setIsExitModalOpen(false);
        router.back();
    };

    return (
        <>
            <BackHeader onBack={handleBackClick} />

            <main className="max-w-md mx-auto px-5 pb-[100px]">
                <ItemForm isEdit initialData={MOCK_ITEM_EDIT_DATA} />
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