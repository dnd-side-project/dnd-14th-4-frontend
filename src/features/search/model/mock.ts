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
  { id: 1, title: '왓츠인마이팩 3.11.0 업데이트 안내', date: '2026.02.14' },
  { id: 2, title: '개인정보 처리방침 개정 안내', date: '2026.01.20' },
];

export const WITHDRAWAL_REASONS = [
  "서비스 이용 방법이 어렵고 불편해요",
  "제공되는 정보가 부족해요",
  "제공되는 정보가 실질적인 도움이 되지 않아요",
  "대체할 수 있는 다른 앱을 주로 사용해요",
  "개인정보 보호를 위해 삭제하고 싶어요",
  "기타"
];

export const WITHDRAWAL_GUIDELINES = [
  "계정 정보와 위시리스트 기록은 모두 삭제되며 다시 복구할 수 없어요.",
  "탈퇴 즉시 이메일 등 개인을 식별할 수 있는 정보가 파기되어 본인 확인이 불가능해져요.",
  "작성하신 팩과 리뷰는 서비스 운영을 위해 남겨지며, 닉네임은 '알 수 없음'으로 익명 처리돼요.",
  "게시물 삭제를 원하시면 탈퇴 진행 전 미리 직접 삭제해 주세요."
];