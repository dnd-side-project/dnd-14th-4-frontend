import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { HomePackApiDto } from "./mockHome";

export type TrendingTagsResponse = Record<string, HomePackApiDto[]>;

const CATEGORY_ORDER = [
  "공부/시험",
  "면접/취준",
  "업무/출근",
  "약속/데이트",
  "운동/산책",
  "여행/캠핑",
  "취미/작업",
  "육아/반려동물",
] as const;

type CategoryKey = (typeof CATEGORY_ORDER)[number];

export const useTrendingTags = () => {
  return useQuery({
    queryKey: ["home", "trending-tags"],
    queryFn: async () => {
      const { data } =
        await apiClient.get<TrendingTagsResponse>(
          "/api/v1/packs/trending-tags",
        );
      return data;
    },

    select: (data) => {
      const keys = Object.keys(data);

      const ordered = [
        ...CATEGORY_ORDER.filter((k) => keys.includes(k)),
        ...keys.filter(
          (k): k is string =>
            !CATEGORY_ORDER.includes(k as CategoryKey)
        ),
      ];

      const visibleTags = ordered.filter(
        (k) => (data[k]?.length ?? 0) > 0
      );

      return {
        raw: data,
        tags: visibleTags,
      };
    },
  });
};