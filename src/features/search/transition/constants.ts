/** 검색바 전환 애니메이션용 상수 */

/** 검색 페이지 헤더 검색바 영역 (뒤로/필터 버튼 제외) */
export const LAYOUT = {
  HEADER_PADDING: 16,
  HEADER_TOP: 20,
  BUTTON_WIDTH: 44,
  GAP: 8,
  BAR_HEIGHT: 44,
} as const;

export const DURATION = 0.35;
export const EASE = [0.25, 0.1, 0.25, 1] as const;

export const TITLE_FADE_DURATION = DURATION * 0.6;

export type Rect = { left: number; top: number; width: number; height: number };

export function getHeaderBarTargetWidth(): number {
  if (typeof window === "undefined") return 0;
  const { HEADER_PADDING, BUTTON_WIDTH, GAP } = LAYOUT;
  const targetLeft = HEADER_PADDING + BUTTON_WIDTH + GAP;
  const targetRight = HEADER_PADDING + BUTTON_WIDTH + GAP;
  const w =
    typeof window.visualViewport !== "undefined" && window.visualViewport
      ? window.visualViewport.width
      : document.documentElement.clientWidth;
  return w - targetLeft - targetRight;
}

export function getHeaderBarTargetStyle(): Rect {
  const { HEADER_PADDING, BUTTON_WIDTH, GAP, HEADER_TOP, BAR_HEIGHT } = LAYOUT;
  const left = HEADER_PADDING + BUTTON_WIDTH + GAP;
  return {
    left,
    top: HEADER_TOP,
    width: getHeaderBarTargetWidth(),
    height: BAR_HEIGHT,
  };
}
