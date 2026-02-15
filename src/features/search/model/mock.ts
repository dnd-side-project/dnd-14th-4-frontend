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

export const NOTICES = [
  { id: 1, title: '왓츠인마이팩 3.11.0 업데이트 안내', date: '2026.02.14', href: '/notice/1' },
  { id: 2, title: '개인정보 처리방침 개정 안내', date: '2026.01.20', href: '/notice/2' },
];

export const WITHDRAWAL_REASONS = [
  "서비스 이용 방법이 어렵고 불편해요",
  "제공되는 정보가 부족해요",
  "제공되는 정보가 실질적인 도움이 되지 않아요",
  "대체할 수 있는 다른 앱을 주로 사용해요",
  "개인정보 보호를 위해 삭제하고 싶어요",
  "기타"
];