import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { Item, GetItemsErrorResponse } from "../model/types";
import { AxiosError } from "axios";
import { getAccessToken } from "@/shared/lib/auth";

export const useGetItems = () => {
    const isAuthenticated = !!getAccessToken();
    return useQuery<Item[], AxiosError<GetItemsErrorResponse>>({
        queryKey: ["items"],
        enabled: isAuthenticated,
        queryFn: async () => {
            const { data } = await apiClient.get<Item[]>("/api/v1/items");
            return data;
        },
    });
};