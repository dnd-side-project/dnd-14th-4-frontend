"use client";

import { FormSection } from '@/shared/ui/FormSection';
import { ItemDetailSection } from './section/ItemDetailSection';
import { RatingSelectSection } from './section/RatingSelectSection';
import { ImageReviewSection } from './section/ImageReviewSection';
import { UsagePeriodSection } from './section/UsagePeriodSection';
import { PurchaseSection } from './section/PurchaseSection';
import { FixedBottomButton } from '@/shared/ui/FixedBottomButton';
import { useItemForm } from '@/features/items/model/useItemForm';
import type { ItemAddRequestDTO } from '@/features/items/model/types';

interface ItemFormProps {
    initialData?: Partial<ItemAddRequestDTO>;
    isEdit?: boolean;
}

export const ItemForm = ({ initialData, isEdit = false }: ItemFormProps) => {
    const {
        formData,
        images,
        setImages,
        updateField,
        submitForm,
        isLoading
    } = useItemForm(initialData, isEdit);
    const isDetailFilled = formData.brand.trim() !== "" && formData.product.trim() !== "";
    const isRatingSelected = formData.rating !== null;
    const showAllSections = isEdit || (isDetailFilled && isRatingSelected);

    return (
        <div className="flex flex-col gap-12 pb-20">
            <ItemDetailSection
                values={{ brand: formData.brand, product: formData.product }}
                onChange={(field, value) => updateField(field, value)}
            />

            {(isEdit || isDetailFilled) && (
                <FormSection title="만족도">
                    <RatingSelectSection
                        selected={formData.rating}
                        onSelect={(value) => updateField("rating", value)}
                    />
                </FormSection>
            )}

            {showAllSections && (
                <div className="flex flex-col gap-12">
                    <FormSection title="리뷰 작성" isOptional>
                        <ImageReviewSection
                            images={images}
                            onImagesChange={setImages}
                            tags={formData.tags}
                            onTagsChange={(value) => updateField("tags", value)}
                        />
                    </FormSection>

                    <FormSection title="사용 기간" isOptional>
                        <UsagePeriodSection
                            selected={formData.period}
                            onSelect={(value) => updateField("period", value)}
                        />
                    </FormSection>

                    <FormSection title="구매처" isOptional>
                        <PurchaseSection
                            value={formData.purchaseLocation}
                            onChange={(value) => updateField("purchaseLocation", value)}
                        />
                    </FormSection>

                    <FixedBottomButton
                        onClick={submitForm}
                        disabled={!isDetailFilled || !isRatingSelected || isLoading}
                    >
                        {isLoading ? "처리 중..." : (isEdit ? "수정 완료" : "저장")}
                    </FixedBottomButton>
                </div>
            )}
        </div>
    );
};