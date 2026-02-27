import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import type { HomePackApiDto } from "./mockHome";

export type RecommendedPacksResponse = Record<string, HomePackApiDto[]>;

export const RECOMMENDATION_TITLE_BY_CATEGORY_ID: Record<string, string> = {
  "1": "성적 올리는 열공 필수팩",
  "2": "합격 선배들의 취뽀팩",
  "3": "일잘러 삶의 질 상승 팩",
  "4": "센스 있다는 소리 듣는 외출팩",
  "5": "운동 효과 UP! 오운완 인증 필수팩",
  "6": "프로 여행러의 짐 싸기 꿀팁팩",
  "7": "장인은 장비빨, 취미생활 부스트팩",
  "8": "아이/강아지 반려 생활 꿀템팩",
};

export const useRecommendedPacks = () => {
  return useQuery({
    queryKey: ["home", "recommended-packs"],
    queryFn: async () => {
      const { data } = await apiClient.get<RecommendedPacksResponse>(
        "/api/v1/packs/recommendation"
      );
      return data;
    },
  });
};
