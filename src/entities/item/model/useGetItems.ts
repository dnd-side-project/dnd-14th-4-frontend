// entities/item/api/useGetItems.ts
import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/shared/api/apiClient";
import type { Item, GetItemsErrorResponse } from "../model/types";
import { AxiosError } from "axios";

export const useGetItems = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // 처음엔 로딩 중
    const [error, setError] = useState<string | null>(null);

    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const { data } = await apiClient.get<Item[]>("/api/v1/items");
            setItems(data); // 데이터 저장
        } catch (err) {
            const axiosError = err as AxiosError<GetItemsErrorResponse>;
            const errorMessage =
                axiosError.response?.data?.message || "아이템 목록을 불러오는 데 실패했습니다.";

            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return { items, isLoading, error, refetch: fetchItems };
};