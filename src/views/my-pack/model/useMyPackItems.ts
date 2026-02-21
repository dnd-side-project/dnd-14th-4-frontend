"use client";

import { useSyncExternalStore } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyItems, myItemsQueryKey } from "@/shared/api/items";
import { getAccessToken } from "@/shared/api/client";

const emptySubscribe = () => () => {};
const getHasTokenSnapshot = () => !!getAccessToken();
const getServerSnapshot = () => false;

/** 내 아이템 목록 조회. 테스트: localStorage에 accessToken = "user_1" 저장 후 새로고침하면 시드 데이터 5개 조회 */
export function useMyPackItems() {
    const hasToken = useSyncExternalStore(emptySubscribe, getHasTokenSnapshot, getServerSnapshot);

    const query = useQuery({
        queryKey: myItemsQueryKey,
        queryFn: getMyItems,
        enabled: hasToken,
    });

    return {
        items: query.data ?? [],
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
        hasToken,
    };
}
