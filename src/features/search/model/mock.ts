import { PackCardData } from "@/shared/ui/item/PackCard";

export type RecentSearch = { id: string; keyword: string; createdAt: string };
export type PopularKeyword = { id: string; label: string; value: string };

export const RECENT_SEARCHES: RecentSearch[] = [
  { id: "r1", keyword: "검색어 1", createdAt: "2026-02-10T10:00:00Z" },
  { id: "r2", keyword: "검색어 2", createdAt: "2026-02-10T09:30:00Z" },
  { id: "r3", keyword: "검색어 3", createdAt: "2026-02-09T22:10:00Z" },
  { id: "r4", keyword: "검색어 4", createdAt: "2026-02-09T21:45:00Z" },
];

export const POPULAR_KEYWORDS: PopularKeyword[] = [
  { id: "p1", label: "업무/출근", value: "work" },
  { id: "p2", label: "여행/캠핑", value: "travel" },
  { id: "p3", label: "공부/시험", value: "study" },
];
export const TAGS = ["공부/시험", "면접/취준", "업무/취준", "약속/데이트", "운동/산책"] as const;
export type Tag = (typeof TAGS)[number];

export type PackItem = {
  id: string;
  title: string;
  nickname: string;
};


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

export const MOCK_ITEMS = [
  {
    id: 1,
    brandName: "애플",
    productName: "아이폰 15 프로",
    satisfaction: "MUST_HAVE", // 🏆인생템
    review: "카메라 성능이 정말 압도적입니다. 티타늄 소재라 가벼워요!",
    reviewImagePaths: [
      "https://images.unsplash.com/photo-1696446701796-da61225697cc",
      "https://images.unsplash.com/photo-1678911820864-e2c567c655d7"
    ],
    usePeriod: "ABOVE_ONE_YEAR", // 1년 이상
    purchaseLocation: "애플 가로수길",
    liked: true,
    tags: ["애플", "아이폰", "스마트폰"]
  },
  {
    id: 2,
    brandName: "이솝",
    productName: "레저렉션 아로마틱 핸드 밤",
    satisfaction: "VERY_GOOD", // ♥️매우좋아요
    review: "향이 너무 좋아서 회사 책상에 두고 매일 써요. 보습력도 최고!",
    reviewImagePaths: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571"
    ],
    usePeriod: "ABOVE_THREE_YEAR", // 3년 이상
    purchaseLocation: "카카오톡 선물하기",
    liked: true,
    tags: ["핸드크림", "이솝", "선물추천"]
  }
];



export const MOCK_ITEM_EDIT_DATA = {
  brand: "나이키",
  product: "러닝화",
  rating: "GOOD",
  period: "1MONTH",
  purchaseLocation: "강남 플래그십 스토어",
  tags: ["가벼움", "편함"]
};


export const MOCK_PACK_CARDS: PackCardData[] = [
  {
    id: 1,
    tag: "운동/산책",
    itemCount: 8,
    title: "팩 이름은 최대 길이 20자입니다다다",
    author: "닉네임은열자가최대야",
    description: "가벼운 조깅이나 동네 산책할 때 챙기면 딱 좋은 필수템 모음집입니다.",
    liked: false,
    date: "2일 전"
  },
  {
    id: 2,
    tag: "운동/산책",
    itemCount: 8,
    title: "팩 이름은 최대 길이 20자입니다다다",
    author: "닉네임은열자가최대야",
    description: "가벼운 조깅이나 동네 산책할 때 챙기면 딱 좋은 필수템 모음집입니다.",
    liked: false,
    date: "2일 전"
  },
]

export const PACKS_BY_TAG: Record<Tag, PackItem[]> = {
  "공부/시험": [
    { id: "study-1", title: "공부 필수템 20...", nickname: "닉네임은열자가최대야" },
    { id: "study-2", title: "시험 전날 챙김 20...", nickname: "닉네임은열자가최대야" },
    { id: "study-3", title: "독서실 가방 20...", nickname: "닉네임은열자가최대야" },
  ],
  "면접/취준": [
    { id: "job-1", title: "면접 당일 필수 20...", nickname: "닉네임은열자가최대야" },
    { id: "job-2", title: "자소서/포트 20...", nickname: "닉네임은열자가최대야" },
    { id: "job-3", title: "정장 주머니 20...", nickname: "닉네임은열자가최대야" },
  ],
  "업무/취준": [
    { id: "work-1", title: "출근 가방 루틴 20...", nickname: "닉네임은열자가최대야" },
    { id: "work-2", title: "회의용 파우치 20...", nickname: "닉네임은열자가최대야" },
    { id: "work-3", title: "노트북 수납 20...", nickname: "닉네임은열자가최대야" },
  ],
  "약속/데이트": [
    { id: "date-1", title: "약속 전 필수 20...", nickname: "닉네임은열자가최대야" },
    { id: "date-2", title: "미니백 구성 20...", nickname: "닉네임은열자가최대야" },
    { id: "date-3", title: "향/메이크업 20...", nickname: "닉네임은열자가최대야" },
  ],
  "운동/산책": [
    { id: "walk-1", title: "오운완 필수팩 20...", nickname: "닉네임은열자가최대야" },
    { id: "walk-2", title: "러닝 장비팩 20...", nickname: "닉네임은열자가최대야" },
    { id: "walk-3", title: "산책 루틴팩 20...", nickname: "닉네임은열자가최대야" },
  ],
};
