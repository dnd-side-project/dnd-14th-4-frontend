export type HomePackApiDto = {
  id: number;
  title: string;
  contextCategory: string; // e.g. "운동/산책"
  nickname: string;
  items: number; // itemCount
  imageUrl?: string;
  isPackInWishList: boolean;
  path?: string;
};

/**
 *  카테고리별 섹션 타이틀 매핑
 */
export const CATEGORY_TITLE_MAP: Record<string, string> = {
  "공부/시험": "성적 올리는 열공 필수팩",
  "면접/취준": "합격 선배들의 취뽀팩",
  "업무/출근": "일잘러 삶의 질 상승 팩",
  "약속/데이트": "센스 있다는 소리 듣는 외출팩",
  "운동/산책": "운동 효과 UP! 오운완 인증 필수팩",
  "여행/캠핑": "프로 여행러의 짐 싸기 꿀팁팩",
  "취미/작업": "장인은 장비빨, 취미생활 부스트팩",
  "육아/반려동물": "아이/강아지 반려 생활 꿀템팩",
};

export function getCategoryTitle(category: string) {
  return CATEGORY_TITLE_MAP[category] ?? category;
}

/**
 *  카테고리별로 묶기 유틸 (API 응답 → section 구성에 사용)
 */
export function groupByCategory(list: HomePackApiDto[]) {
  const map = new Map<string, HomePackApiDto[]>();
  for (const p of list) {
    const arr = map.get(p.contextCategory) ?? [];
    arr.push(p);
    map.set(p.contextCategory, arr);
  }
  return map;
}