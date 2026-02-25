import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { PackSearchDto } from "./types";

type SearchPacksResponse = {
  items: PackSearchDto[];
  page: number;
  size: number;
  total: number;
  hasNext: boolean;
};

export const useSearchPacks = (keyword: string) => {
  const trimmedKeyword = keyword.trim();

  return useQuery({
    queryKey: ["packs", "search", trimmedKeyword],
    enabled: trimmedKeyword.length > 0,

    queryFn: async () => {
      const { data } = await apiClient.get<SearchPacksResponse>(
        "/api/v1/packs/search",
        {
          params: { q: trimmedKeyword },
        }
      );
      return data.items;
    },
  });
};