import { useQuery } from "@tanstack/react-query";
import apiClient from "@/shared/api/apiClient";
import { Item } from "@/entities/item/model/types";


const getItemDetail = async (itemId: string | number) => {
    const { data } = await apiClient.get<Item>(`/api/v1/items/${itemId}`);
    return data;
};

export const useGetItemDetail = (itemId: string | number | undefined) => {
    return useQuery({
        queryKey: ["item", itemId],
        queryFn: () => getItemDetail(itemId!),
        enabled: !!itemId,
        staleTime: 500 * 60 * 10,
    });
};