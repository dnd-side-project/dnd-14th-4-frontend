"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import type { Item } from "@/entities/item/model/types";
import { ItemAdd } from "@/views/my-pack/ui/components/ItemAdd";
import type { PackCardData } from "@/shared/ui/item/PackCard";
import PackDetailContent from "@/views/pack-detail/ui/components/packDetail";
import { usePackDetail } from "@/views/pack-detail/model/usePackDetail";

export default function PackDetailPage() {
    const params = useParams();
    const rawId = params?.id;
    const packIdParam = Array.isArray(rawId) ? rawId[0] : rawId;
    const packId = Number(packIdParam);

    const { data, isLoading, isError } = usePackDetail(
        Number.isFinite(packId) ? packId : undefined
    );

    const packData = useMemo<PackCardData | undefined>(() => {
        if (!data) return undefined;

        return {
            id: data.id,
            tag: data.contextCategory,
            itemCount: data.itemList.length,
            title: data.title,
            author: data.user,
            description: data.introduction,
            date: data.date,
        };
    }, [data]);

    const items = useMemo<Item[]>(() => {
        if (!data) return [];

        return data.itemList.map((item) => ({
            id: item.itemId,
            brandName: item.brand,
            productName: item.title,
            satisfaction: item.satisfaction,
            review: item.review,
            reviewImagePaths: item.imageUrls,
            usePeriod: item.usePeriod,
            purchaseLocation: item.purchase,
            tags: item.tags,
        }));
    }, [data]);

    const [isAddingItem, setIsAddingItem] = useState(false);

    if (!Number.isFinite(packId)) {
        return <div>잘못된 팩 경로입니다.</div>;
    }

    if (isLoading) {
        return <div>팩 정보를 불러오는 중...</div>;
    }

    if (isError) {
        return <div>팩 정보를 불러오지 못했습니다.</div>;
    }

    if (isAddingItem) {
        return (
            <ItemAdd
                onBack={() => setIsAddingItem(false)}
                addMode="item"
            />
        );
    }

    return (
        <>
            {
                packData ? (
                    <PackDetailContent
                        packData={packData}
                        items={items}
                        onAddItem={() => setIsAddingItem(true)}
                    />

                ) :
                    <div>해당 팩을 찾을 수 없습니다.</div>
            }
        </>
    );
}