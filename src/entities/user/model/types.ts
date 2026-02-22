export interface MypageResponse {
  /** 프로필 이미지 URL 또는 기본 색상: yellow | red | blue | green | purple */
  name: string;
  profileImageUrl: string;
  contextCategoryNames: string[];
}

/** 앱에서 사용하는 유저(프로필) 타입 */
export interface User {
  name: string;
  profileImageUrl: string;
  contextCategoryNames: string[];
}

/** 프로필 이미지 없을 때 API가 반환하는 기본 색상 */
export const PROFILE_DEFAULT_COLORS = [
  "yellow",
  "red",
  "blue",
  "green",
  "purple",
] as const;

export type ProfileDefaultColor = (typeof PROFILE_DEFAULT_COLORS)[number];

export function isProfileDefaultColor(
  value: string
): value is ProfileDefaultColor {
  return PROFILE_DEFAULT_COLORS.includes(value as ProfileDefaultColor);
}
