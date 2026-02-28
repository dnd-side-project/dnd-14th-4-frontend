"use client";

import { useMemo, useState, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import type { Item } from "@/entities/item/model/types";
import { ItemAdd } from "@/views/my-pack/ui/components/ItemAdd";
import type { PackCardData } from "@/shared/ui/item/PackCard";
import PackDetailContent from "@/views/pack-detail/ui/components/packDetail";
import { usePackDetail } from "@/views/pack-detail/model/usePackDetail";
import { useGetItems } from "@/entities/item/model/useGetItems";
import { useTogglePackWish } from "@/entities/wishlist/model/useTogglePackWish";
import Loading from "@/shared/ui/Loading";

function PackDetailPageInner() {
    const params = useParams();
    const searchParams = useSearchParams();
    const itemIdsParam = searchParams.get("itemIds");
    const rawId = params?.id;
    const packIdParam = Array.isArray(rawId) ? rawId[0] : rawId;
    const packId = Number(packIdParam);

    const { data, isLoading, isError } = usePackDetail(
        Number.isFinite(packId) ? packId : undefined
    );
    const { data: allItems } = useGetItems();
    const { mutate: togglePackWish } = useTogglePackWish();

    const propLiked = !!data?.isPackInWishList;
    const [isLiked, setIsLiked] = useState<boolean>(propLiked);
    const [prevPropLiked, setPrevPropLiked] = useState<boolean>(propLiked);

    if (propLiked !== prevPropLiked) {
        setPrevPropLiked(propLiked);
        setIsLiked(propLiked);
    }

    const handleTogglePackWish = () => {
        if (!data) return;
        const currentLiked = isLiked;
        setIsLiked(!currentLiked);
        togglePackWish({
            packId: data.id,
            isWished: currentLiked
        }, {
            onError: () => {
                setIsLiked(currentLiked);
            }
        });
    };

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
            profile: data.profileImage,
            liked: data.isPackInWishList,
        };
    }, [data]);

    const [newlyAddedIds, setNewlyAddedIds] = useState<string[]>(
        itemIdsParam ? itemIdsParam.split(",") : []
    );

    const items = useMemo<Item[]>(() => {
        if (!data) return [];

        const existingItems: Item[] = data.itemList.map((item) => ({
            id: item.itemId,
            brandName: item.brand,
            productName: item.title,
            satisfaction: item.satisfaction,
            review: item.review,
            reviewImagePaths: item.imageUrls,
            usePeriod: item.usePeriod,
            purchaseLocation: item.purchase,
            tags: item.tags,
            liked: item.isItemInWishList,
        }));

        if (newlyAddedIds.length > 0) {
            const addedItems = allItems
                ?.filter((item) => newlyAddedIds.includes(String(item.id)))
                .filter((ai) => !existingItems.some((ei) => ei.id === ai.id)) ?? [];

            return [...existingItems, ...addedItems];
        }

        return existingItems;
    }, [data, newlyAddedIds, allItems]);

    const [isAddingItem, setIsAddingItem] = useState(false);

    if (!Number.isFinite(packId)) {
        return <div>잘못된 팩 경로입니다.</div>;
    }

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>팩 정보를 불러오지 못했습니다.</div>;
    }

    if (isAddingItem) {
        return (
            <ItemAdd
                onBack={() => setIsAddingItem(false)}
                addMode="item"
                initialSelectedItemIds={newlyAddedIds}
                onAddItems={(selectedItems) => {
                    const ids = selectedItems.map(item => String(item.id));
                    setNewlyAddedIds(ids);
                    setIsAddingItem(false);
                }}
            />
        );
    }

    return (
        <>
            {packData ? (
                <PackDetailContent
                    packData={packData}
                    items={items}
                    onAddItem={() => setIsAddingItem(true)}
                    newlyAddedIds={newlyAddedIds.map(Number)}
                    isLiked={isLiked}
                    onTogglePackWish={handleTogglePackWish}
                />
            ) : (
                <div>해당 팩을 찾을 수 없습니다.</div>
            )}
        </>
    );
}

export default function PackDetailPage() {
    return (
        <Suspense fallback={<Loading />}>
            <PackDetailPageInner />
        </Suspense>
    );
}
