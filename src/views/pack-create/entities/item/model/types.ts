export type Item = {
  id: string;
  name: string;
  brand?: string;
  likeLabel?: string; // 예: "👍 좋아요"
  durationLabel?: string; // 예: "1년 이상"
  kind?: "ITEM";
};
