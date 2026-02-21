import { apiClient } from "./client";
import type { ItemCardData, ItemCardSatisfaction, ItemCardUsagePeriod } from "@/shared/ui/item/ItemCard";

/** GET /api/v1/items 응답 아이템 (백엔드 스키마에 맞게 필드 추가/수정 가능) */
export interface ApiItem {
    id: string | number;
    title?: string;
    name?: string;
    satisfaction?: string;
    usagePeriod?: string;
    itemCount?: number;
    author?: string;
    nickname?: string;
    liked?: boolean;
    [key: string]: unknown;
}

function mapSatisfaction(s?: string): ItemCardSatisfaction | undefined {
    if (!s) return undefined;
    const v = s as ItemCardSatisfaction;
    if (["좋아요", "매우좋아요", "인생템"].includes(v)) return v;
    return undefined;
}

function mapUsagePeriod(s?: string): ItemCardUsagePeriod | undefined {
    if (!s) return undefined;
    const v = s as ItemCardUsagePeriod;
    if (["1년이하", "1년이상", "3년이상", "5년이상"].includes(v)) return v;
    return undefined;
}

function toItemCardData(item: ApiItem): ItemCardData {
    const id = String(item.id);
    const title = item.title ?? item.name ?? "";
    const author = item.author ?? item.nickname ?? "";
    return {
        id,
        satisfaction: mapSatisfaction(item.satisfaction),
        usagePeriod: mapUsagePeriod(item.usagePeriod),
        itemCount: item.itemCount ?? 1,
        title,
        author,
        liked: item.liked,
    };
}

/** 로그인한 유저의 인생 아이템 목록 최신순 조회 (테스트: accessToken = "user_1" 또는 "user_2" 시 5개) */
export async function getMyItems(): Promise<ItemCardData[]> {
    const raw = await apiClient<ApiItem[]>("/api/v1/items");
    const list = Array.isArray(raw) ? raw : [];
    return list.map(toItemCardData);
}

export const myItemsQueryKey = ["myItems"] as const;
