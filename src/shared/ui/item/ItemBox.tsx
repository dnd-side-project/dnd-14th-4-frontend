"use client"

import { useState, useEffect } from "react"
import { IcSvgWishBtn } from "@/shared/icons"
import Tag1Btn from "@/shared/ui/Tag1Btn"
import Image from "next/image"
import { Item } from "@/entities/item/model/types"
import { buildDisplayTags } from "@/shared/utils/ItemCard.utils"
import ItemTagChip from "../ItemTagChip"

interface ItemBoxProps {
    item: Item;
    showWishBtn?: boolean;
    isWished?: boolean;
    onWishClick?: () => void;
}

export function ItemBox({
    item,
    showWishBtn = false,
    isWished = false,
    onWishClick
}: ItemBoxProps) {
    const [localLiked, setLocalLiked] = useState(isWished);

    useEffect(() => {
        setLocalLiked(isWished);
    }, [isWished]);

    const displayTags = buildDisplayTags(item.satisfaction, item.usePeriod);
    const satisfactionTag = displayTags.find(t => t.variant === "black")?.label;
    const periodTag = displayTags.find(t => t.variant === "beige60")?.label;

    const handleLikeClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setLocalLiked((prev) => !prev);
        onWishClick?.();
    };

    return (
        <div className="w-full p-4 shadow-emphasize rounded-[20px] bg-white">
            <div className="flex justify-between items-start">
                <div className="flex flex-wrap gap-1 items-center">
                    <h2 className="type-heading2 text-label-default">{item.productName}</h2>
                </div>

                {showWishBtn && (
                    <button
                        type="button"
                        aria-label="좋아요"
                        onClick={handleLikeClick}
                        className="p-1"
                    >
                        <IcSvgWishBtn
                            className="w-7 h-7"
                            fill={localLiked ? "var(--color-primary-subtler)" : "var(--alpha-5)"}
                            strokeColor={localLiked ? "var(--color-primary-subtle)" : "var(--alpha-22)"}
                        />
                    </button>
                )}
            </div>

            <p className="type-body1 text-label-subtle mt-1">{item.brandName}</p>

            <div className="w-full overflow-x-auto mt-4 no-scrollbar">
                <div className="flex gap-[10px] w-max">
                    {item.reviewImagePaths?.map((src, idx) => (
                        <div key={`${src}-${idx}`} className="w-[100px] h-[100px] flex-shrink-0 overflow-hidden rounded-[8px] bg-neutral-95 relative">
                            <Image src={src} alt={`${item.productName} 이미지 ${idx + 1}`} fill className="object-cover" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
                {satisfactionTag && <Tag1Btn variant="primary" mode="chip">{satisfactionTag}</Tag1Btn>}
                {periodTag && <Tag1Btn variant="secondary" mode="chip">{periodTag}</Tag1Btn>}

                <p className="type-caption2 text-label-subtle">구매처 : {item.purchaseLocation}</p>
            </div>
            <div className="flex gap-2 flex-wrap mt-3">
                {item.tags?.map((tag) => (
                    <ItemTagChip key={tag}>{tag}</ItemTagChip>
                ))}
            </div>
        </div>
    )
}