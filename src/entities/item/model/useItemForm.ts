import { useState } from 'react';
import { useItemSubmit } from '@/entities/item/model/useItemSubmit';
import { appToast } from '@/shared/utils/toast';
import { Item } from '@/entities/item/model/types';
import { PERIOD_TO_SERVER, SATISFACTION_TO_SERVER } from '@/shared/utils/ItemCard.utils';
import { useRouter } from 'next/navigation';

export const useItemForm = (initialData?: Partial<Item>, isEdit = false) => {
    const router = useRouter();
    const [formData, setFormData] = useState<Item>({
        id: initialData?.id || 0,
        brandName: initialData?.brandName || "",
        productName: initialData?.productName || "",
        satisfaction: initialData?.satisfaction || "",
        usePeriod: initialData?.usePeriod || "",
        purchaseLocation: initialData?.purchaseLocation || "",
        tags: initialData?.tags || [],
    });

    const [images, setImages] = useState<(File | string)[]>(initialData?.reviewImagePaths ?? []);

    const { submitItem, isLoading } = useItemSubmit();

    const updateField = <K extends keyof Item>(field: K, value: Item[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const submitForm = async () => {
        if (!formData.brandName || !formData.productName || !formData.satisfaction) {
            appToast.error("필수 항목을 입력해주세요.");
            return;
        }

        try {
            const newFileImages = images.filter((img): img is File => img instanceof File);

            await submitItem({
                itemId: isEdit ? formData.id : undefined,
                request: {
                    brandName: formData.brandName,
                    productName: formData.productName,
                    satisfaction: SATISFACTION_TO_SERVER[formData.satisfaction] || formData.satisfaction,
                    tags: (formData.tags ?? []).length > 0 ? formData.tags : undefined,
                    usePeriod: formData.usePeriod ? (PERIOD_TO_SERVER[formData.usePeriod] || formData.usePeriod) : undefined,
                    purchaseLocation: formData.purchaseLocation || undefined,
                },
                reviewImages: newFileImages.length > 0 ? newFileImages : undefined,
            });

            appToast.success(`아이템이 성공적으로 ${isEdit ? '수정' : '등록'}되었습니다.`);
            router.back();
        } catch (error) {
            console.error("제출 실패:", error);
            appToast.error("저장에 실패했습니다.");
        }
    };

    return { formData, images, setImages, updateField, submitForm, isLoading };
};