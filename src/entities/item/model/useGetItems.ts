import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { Item, GetItemsErrorResponse } from "../model/types";
import { AxiosError } from "axios";

export const useGetItems = () => {
    return useQuery<Item[], AxiosError<GetItemsErrorResponse>>({
        queryKey: ["items"],
        queryFn: async () => {
            const { data } = await apiClient.get<Item[]>("/api/v1/items");
            return data;
        },
    });
};