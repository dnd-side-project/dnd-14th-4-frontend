import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";

export interface PackDetailItemApiDto {
  itemId: number;
  title: string;
  brand: string;
  review: string;
  satisfaction: string;
  usePeriod: string;
  purchase: string;
  imageUrls: string[];
  tags: string[];
  isItemInWishlist: boolean;
}

export interface PackDetailResponse {
  id: number;
  user: string;
  title: string;
  date: string;
  profileImage: string;
  introduction: string;
  contextCategory: string;
  isPackInWishList: boolean;
  itemList: PackDetailItemApiDto[];
}

export const usePackDetail = (packId: number | undefined) => {
  return useQuery({
    queryKey: ["pack", "detail", packId],
    enabled: packId !== undefined,
    queryFn: async () => {
      const { data } = await apiClient.get<PackDetailResponse>(`/api/v1/packs/${packId}`);
      return data;
    },
  });
};
