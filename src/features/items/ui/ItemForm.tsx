"use client";

import { FormSection } from '@/shared/ui/FormSection';
import { ItemDetailSection } from './section/ItemDetailSection';
import { RatingSelectSection } from './section/RatingSelectSection';
import { ImageReviewSection } from './section/ImageReviewSection';
import { UsagePeriodSection } from './section/UsagePeriodSection';
import { PurchaseSection } from './section/PurchaseSection';
import { FixedBottomButton } from '@/shared/ui/FixedBottomButton';
import { useItemForm } from '@/entities/item/model/useItemForm';
import { buildDisplayTags } from '@/shared/utils/ItemCard.utils';
import { Item } from '@/entities/item/model/types';

interface ItemFormProps {
    initialData?: Item;
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
    const displayTags = buildDisplayTags(formData.satisfaction, formData.usePeriod);

    const satisfactionLabel = displayTags.find(t => t.variant === "black")?.label || null;
    const usagePeriodLabel = displayTags.find(t => t.variant === "beige60")?.label || null;

    const isDetailFilled = formData.brandName?.trim() !== "" && formData.productName?.trim() !== "";
    const isRatingSelected = formData.satisfaction !== "";
    const showAllSections = isEdit || (isDetailFilled && isRatingSelected);
    return (
        <div className="flex flex-col gap-12 pb-20">
            <ItemDetailSection
                values={{ brandName: formData.brandName, productName: formData.productName }}
                onChange={(field, value) => updateField(field, value)}
            />

            {(isEdit || isDetailFilled) && (
                <FormSection title="만족도">
                    <RatingSelectSection
                        selected={isEdit ? satisfactionLabel : formData.satisfaction}
                        onSelect={(value) => updateField("satisfaction", value)}
                    />
                </FormSection>
            )}

            {showAllSections && (
                <div className="flex flex-col gap-12">
                    <FormSection title="리뷰 작성" isOptional>
                        <ImageReviewSection
                            images={images}
                            onImagesChange={setImages}
                            tags={formData.tags ?? []}
                            onTagsChange={(value) => updateField("tags", value)}
                        />
                    </FormSection>

                    <FormSection title="사용 기간" isOptional>
                        <UsagePeriodSection
                            selected={(isEdit ? usagePeriodLabel : formData.usePeriod) ?? null}
                            onSelect={(value) => updateField("usePeriod", value)}
                        />
                    </FormSection>

                    <FormSection title="구매처" isOptional>
                        <PurchaseSection
                            value={formData.purchaseLocation ?? ""}
                            onChange={(value) => updateField("purchaseLocation", value)}
                        />
                    </FormSection>

                    <FixedBottomButton
                        onClick={submitForm}
                        disabled={!isDetailFilled || !isRatingSelected || isLoading}
                    >
                        {isLoading ? "처리 중" : (isEdit ? "수정 완료" : "저장")}
                    </FixedBottomButton>
                </div>
            )}
        </div>
    );
};