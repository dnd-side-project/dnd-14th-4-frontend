"use client";
import { useState } from 'react';
import { FormSection } from '@/shared/ui/FormSection';
import { ItemDetailSection } from './section/ItemDetailSection';
import { RatingSelectSection } from './section/RatingSelectSection';
import { ImageReviewSection } from './section/ImageReviewSection';
import { UsagePeriodSection } from './section/UsagePeriodSection';
import { PurchaseSection } from './section/PurchaseSection';
import { appToast } from '@/shared/utils/toast';
import { FixedBottomButton } from '@/shared/ui/FixedBottomButton';

// 1. 초기 데이터 타입 정의
interface ItemInitialData {
    brand: string;
    product: string;
    rating: string | null;
    period: string | null;
    purchaseLocation: string;
    images?: File[]; // 실제로는 이미지 URL일 수도 있음
    tags: string[];
}

interface ItemFormProps {
    initialData?: ItemInitialData; // 수정 시에는 데이터를 넘겨줌
    isEdit?: boolean;
}

export const ItemForm = ({ initialData, isEdit = false }: ItemFormProps) => {
    // 2. initialData가 있으면 그 값으로, 없으면 빈 값으로 초기화
    const [itemDetail, setItemDetail] = useState({
        brand: initialData?.brand || "",
        product: initialData?.product || ""
    });
    const [rating, setRating] = useState<string | null>(initialData?.rating || null);
    const [period, setPeriod] = useState<string | null>(initialData?.period || null);
    const [purchaseLocation, setPurchaseLocation] = useState(initialData?.purchaseLocation || "");
    const [images, setImages] = useState<File[]>(initialData?.images ?? []);
    const [tags, setTags] = useState<string[]>(initialData?.tags || []);

    // 수정 모드일 때는 모든 섹션이 바로 보여야 하므로 조건문을 조정하거나 합칩니다.
    const isDetailFilled = itemDetail.brand.trim() !== "" && itemDetail.product.trim() !== "";
    const isRatingSelected = rating !== null;

    // 수정 모드라면 무조건 다 보여주거나, 입력 단계에 따라 보여줌
    const showAllSections = isEdit || (isDetailFilled && isRatingSelected);

    const handleDetailChange = (field: "brand" | "product", value: string) => {
        setItemDetail((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        const payload = { ...itemDetail, rating, period, purchaseLocation, images, tags };

        if (isEdit) {
            console.log("수정 API 호출:", payload);
            appToast.success("수정되었습니다.");
        } else {
            console.log("생성 API 호출:", payload);
            appToast.success("등록되었습니다.");
        }
    };

    return (
        <div className="flex flex-col gap-12 pb-20">
            <ItemDetailSection values={itemDetail} onChange={handleDetailChange} />

            {(isEdit || isDetailFilled) && (
                <FormSection title="만족도">
                    <RatingSelectSection selected={rating} onSelect={setRating} />
                </FormSection>
            )}

            {showAllSections && (
                <div className="flex flex-col gap-12">
                    <FormSection title="리뷰 작성" isOptional>
                        <ImageReviewSection
                            images={images}
                            onImagesChange={setImages}
                            tags={tags}
                            onTagsChange={setTags}
                        />
                    </FormSection>

                    <FormSection title="사용 기간" isOptional>
                        <UsagePeriodSection selected={period} onSelect={setPeriod} />
                    </FormSection>

                    <FormSection title="구매처" isOptional>
                        <PurchaseSection value={purchaseLocation} onChange={setPurchaseLocation} />
                    </FormSection>

                    <FixedBottomButton
                        onClick={handleSubmit}
                        disabled={!isDetailFilled || !isRatingSelected}
                    >
                        {isEdit ? "수정 완료" : "저장"}
                    </FixedBottomButton>

                </div>
            )}
        </div>
    );
};