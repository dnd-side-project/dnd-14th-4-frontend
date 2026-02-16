"use client";
import { useState } from 'react';
import { FormSection } from '@/shared/ui/FormSection';
import { ItemDetailSection } from './section/ItemDetailSection';
import { RatingSelectSection } from './section/RatingSelectSection';
import { ImageReviewSection } from './section/ImageReviewSection';
import { UsagePeriodSection } from './section/UsagePeriodSection';
import { PurchaseSection } from './section/PurchaseSection';
import { Button } from '@/shared/ui/Button';

export const ItemForm = () => {
    const [itemDetail, setItemDetail] = useState({ brand: "", product: "" });
    const [rating, setRating] = useState<string | null>(null);
    const [period, setPeriod] = useState<string | null>(null);
    const [purchaseLocation, setPurchaseLocation] = useState("");
    const [images, setImages] = useState<File[]>([]);
    const [tags, setTags] = useState<string[]>([]);

    const isDetailFilled = itemDetail.brand.trim() !== "" && itemDetail.product.trim() !== "";
    const isRatingSelected = rating !== null;

    const handleDetailChange = (field: "brand" | "product", value: string) => {
        setItemDetail((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        const payload = {
            ...itemDetail,
            rating,
            period,
            purchaseLocation,
            images,
            tags,
        };
        console.log("서버로 보내는 데이터:", payload);
    };

    return (
        <div className="flex flex-col gap-12">
            <ItemDetailSection values={itemDetail} onChange={handleDetailChange} />

            {isDetailFilled && (
                <FormSection title="만족도" >
                    <RatingSelectSection selected={rating} onSelect={setRating} />
                </FormSection>
            )}

            {isRatingSelected && (
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

                    <Button onClick={handleSubmit}>저장</Button>
                </div>
            )}
        </div>
    );
};