"use client";

import { useState, useMemo } from "react";
import { ItemForm } from "@/features/items/ui/ItemForm";
import { BackHeader } from "@/shared/ui/BackHeader";
import { useRouter } from "next/navigation";
import { Modal } from "@/shared/ui/Modal";
import { useParams } from "next/navigation";
import { useGetItems } from "@/entities/item/model/useGetItems";
export default function ItemEditPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;
    const [isExitModalOpen, setIsExitModalOpen] = useState(false);
    const { data } = useGetItems();


    const itemData = useMemo(() => {
        if (!data || !id) return undefined;
        return data.find((item) => String(item.id) === id);
    }, [data, id]);

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