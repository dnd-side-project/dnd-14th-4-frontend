import { useState } from 'react';
import { useItemSubmit } from '@/features/items/model/useItemSubmit';
import { appToast } from '@/shared/utils/toast';
import { ItemAddRequestDTO } from './types';

export interface ItemFormData {
    brand: string;
    product: string;
    rating: string | null;
    period: string | null;
    purchaseLocation: string;
    tags: string[];
}

export const useItemForm = (initialData?: Partial<ItemAddRequestDTO>, isEdit = false) => {
    const [formData, setFormData] = useState<ItemFormData>({
        brand: initialData?.brandName || "",
        product: initialData?.productName || "",
        rating: initialData?.satisfaction || null,
        period: initialData?.usePeriod || null,
        purchaseLocation: initialData?.purchaseLocation || "",
        tags: initialData?.tags || [],
    });

    const [images, setImages] = useState<File[]>(initialData?.reviewImage ?? []);

    const { submitItem, isLoading } = useItemSubmit();

    const updateField = <K extends keyof ItemFormData>(field: K, value: ItemFormData[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };


    const submitForm = async () => {
        if (!formData.brand || !formData.product || !formData.rating) {
            appToast.error("필수 항목을 입력해주세요.");
            return;
        }

        try {
            const satisfactionMap: Record<string, string> = {
                "1": "GOOD",
                "2": "VERY_GOOD",
                "3": "BEST",
            };

            const usePeriodMap: Record<string, string> = {
                "1": "BELOW_ONE_YEAR",
                "2": "OVER_ONE_YEAR",
                "3": "OVER_THREE_YEAR",
                "4": "OVER_FIVE_YEAR",
            };

            await submitItem({
                request: {
                    brandName: formData.brand,
                    productName: formData.product,
                    satisfaction: satisfactionMap[formData.rating] || formData.rating,
                    tags: formData.tags.length > 0 ? formData.tags : undefined,
                    usePeriod: formData.period ? (usePeriodMap[formData.period] || formData.period) : undefined,
                    purchaseLocation: formData.purchaseLocation || undefined,
                },
                reviewImages: images.length > 0 ? images : undefined,
            });

            appToast.success(`아이템이 성공적으로 ${isEdit ? '수정' : '등록'}되었습니다.`);

        } catch (error) {
            console.error("제출 실패:", error);
        }
    };

    return { formData, images, setImages, updateField, submitForm, isLoading };
};