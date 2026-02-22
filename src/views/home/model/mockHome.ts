export type HomePackApiDto = {
    id: number;
    title: string;
    contextCategory: string; // e.g. "운동/산책"
    nickname: string;
    items: number; // itemCount
  };
  
  /**
   *  백엔드에서 내려줄 것 같은 형태 그대로 목데이터
   */
  export const MOCK_HOME_PACKS_API: HomePackApiDto[] = [
    { id: 1, title: "팩 이름은 최대 길이 20자입니다다다다", contextCategory: "운동/산책", nickname: "닉네임은열자카최대야", items: 8 },
    { id: 2, title: "러닝 시작하는 사람 필수템", contextCategory: "운동/산책", nickname: "러너민지", items: 6 },
    { id: 3, title: "헬스장 루틴 생존팩", contextCategory: "운동/산책", nickname: "득근왕", items: 10 },
  
    { id: 11, title: "아이패드 작업 효율 미친팩", contextCategory: "취미/작업", nickname: "디자인장인", items: 8 },
    { id: 12, title: "카메라 입문 장비 추천", contextCategory: "취미/작업", nickname: "사진러", items: 5 },
    { id: 13, title: "공방/핸드메이드 공구팩", contextCategory: "취미/작업", nickname: "메이커", items: 12 },
  
  ];
  
  /**
   * 온보딩에서 선택한 카테고리(API 대체)
   * - 실제 API 붙이면 이 배열도 서버에서 받는 값으로 교체
   */
  export const MOCK_ONBOARDING_CATEGORIES = ["운동/산책", "취미/작업", "공부/시험"] as const;
  
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