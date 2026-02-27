import { useQuery } from "@tanstack/react-query";
import apiClient from "@/shared/api/apiClient";
import { MyPackDto } from "./useGetMyPacks";

const getWishlistPacks = async (): Promise<MyPackDto[]> => {
    const { data } = await apiClient.get<MyPackDto[]>("/api/v1/wishlist/packs");
    return data;
};

export const useGetWishlistPacks = () => {
    return useQuery({
        queryKey: ["wishlist-packs"],
        queryFn: getWishlistPacks,
        select: (data) => data ?? [],
        staleTime: 1000 * 60 * 5,
    });
};