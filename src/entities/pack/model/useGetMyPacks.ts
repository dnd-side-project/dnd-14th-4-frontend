import { useQuery } from "@tanstack/react-query";
import apiClient from "@/shared/api/apiClient";

export interface MyPackDto {
    id: number;
    title: string;
    contextCategory: string;
    nickname: string;
    items: number;
}

const getMyPacks = async (): Promise<MyPackDto[]> => {
    const { data } = await apiClient.get<MyPackDto[]>("/api/v1/packs");
    return data;
};

export const useGetMyPacks = () => {
    return useQuery({
        queryKey: ["my-packs"],
        queryFn: getMyPacks,
        select: (data) => data ?? [],
    });
};