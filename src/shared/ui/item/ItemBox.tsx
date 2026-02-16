"use client"

import { useState } from "react"
import { IcSvgWishBtn } from "@/shared/icons"
import Tag1Btn from "@/shared/ui/Tag1Btn"
import Image from "next/image"
import ItemTagChip from "../ItemTagChip"

export interface ItemData {
    id: number;
    title: string;
    brand: string;
    category: string;
    purchaseAt: string;
    images: string[];
    isWished: boolean;
    mainTags: {
        satisfaction: string;
        period: string;
    };
    subTags: string[];
}

export function ItemBox({ item }: { item: ItemData }) {
    const [isWished, setIsWished] = useState(item.isWished);
    return (
        <div className="w-full p-4 shadow-emphasize rounded-[20px] bg-white">
            <div className="flex justify-between items-start">
                <div className="flex flex-wrap gap-1 items-center">
                    <h2 className="type-heading2 text-label-default">{item.title}</h2>
                    <Tag1Btn mode="chip" variant="pressed">
                        {item.category}
                    </Tag1Btn>
                </div>
                <button
                    type="button"
                    onClick={() => setIsWished(!isWished)}
                    className="p-1"
                >
                    <IcSvgWishBtn
                        className="w-7 h-7"
                        fillColor={isWished ? "var(--color-primary-subtler)" : "var(--alpha-5)"}
                        strokeColor={isWished ? "var(--color-primary-subtle)" : "var(--alpha-22)"}
                    />
                </button>
            </div>

            <p className="type-body1 text-label-subtle mt-1">{item.brand}</p>

            <div className="w-full overflow-x-auto mt-4 no-scrollbar">
                <div className="flex gap-[10px] w-max">
                    {item.images.map((src, idx) => (
                        <div
                            key={`${src}-${idx}`}
                            className="w-[100px] h-[100px] flex-shrink-0 overflow-hidden rounded-[8px] bg-neutral-95 relative"
                        >
                            <Image
                                src={src}
                                alt={`${item.title} 이미지 ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
                <Tag1Btn variant="primary" mode="chip">{item.mainTags.satisfaction}</Tag1Btn>
                <Tag1Btn variant="secondary" mode="chip">{item.mainTags.period}</Tag1Btn>
                <p className="type-caption2 text-label-subtle">구매처 : {item.purchaseAt}</p>
            </div>

            <div className="flex gap-2 flex-wrap mt-3">
                {item.subTags.map((tag) => (
                    <ItemTagChip key={tag}>{tag}</ItemTagChip>
                ))}
            </div>
        </div>
    )
}