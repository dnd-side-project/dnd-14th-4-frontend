export type RecentSearch = { id: string; keyword: string; createdAt: string };
export type PopularKeyword = { id: string; label: string };

export const RECENT_SEARCHES: RecentSearch[] = [
  { id: "r1", keyword: "검색어 1", createdAt: "2026-02-10T10:00:00Z" },
  { id: "r2", keyword: "검색어 2", createdAt: "2026-02-10T09:30:00Z" },
  { id: "r3", keyword: "검색어 3", createdAt: "2026-02-09T22:10:00Z" },
  { id: "r4", keyword: "검색어 4", createdAt: "2026-02-09T21:45:00Z" },
];

export const POPULAR_KEYWORDS: PopularKeyword[] = [
  { id: "p1", label: "업무/출근" },
  { id: "p2", label: "여행/캠핑" },
  { id: "p3", label: "공부/시험" },
];
