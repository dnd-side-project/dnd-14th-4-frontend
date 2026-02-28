import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import { labelToSlug } from "./categories";

export type PopularKeywordItem = {
  id: string;
  label: string;
  value: string;
};

export const POPULAR_KEYWORDS_QUERY_KEY = ["search", "popular-keywords"] as const;

const normalizeKeyword = (item: unknown): string | null => {
  if (typeof item === "string") {
    const trimmed = item.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  if (item && typeof item === "object") {
    const candidate = item as Record<string, unknown>;
    const raw =
      candidate.keyword ?? candidate.name ?? candidate.label ?? candidate.value;

    if (typeof raw === "string") {
      const trimmed = raw.trim();
      return trimmed.length > 0 ? trimmed : null;
    }
  }

  return null;
};

const normalizeResponse = (data: unknown): PopularKeywordItem[] => {
  const source = Array.isArray(data)
    ? data
    : data && typeof data === "object" && Array.isArray((data as Record<string, unknown>).keywords)
      ? ((data as Record<string, unknown>).keywords as unknown[])
      : [];

  return source
    .map(normalizeKeyword)
    .filter((keyword): keyword is string => Boolean(keyword))
    .slice(0, 10)
    .map((keyword, index) => {
      const maybeSlug = labelToSlug(keyword);
      return {
        id: `popular-${index + 1}-${keyword}`,
        label: keyword,
        value: maybeSlug ?? keyword,
      };
    });
};

export const fetchPopularKeywords = async (): Promise<PopularKeywordItem[]> => {
  const { data } = await apiClient.get<unknown>(
    "/api/v1/packs/search/popular-keywords"
  );
  return normalizeResponse(data);
};

export const usePopularKeywords = () => {
  return useQuery({
    queryKey: POPULAR_KEYWORDS_QUERY_KEY,
    queryFn: fetchPopularKeywords,
    staleTime: 1000 * 60 * 5,
  });
};
