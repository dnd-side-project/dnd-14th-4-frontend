/** URL 쿼리용 카테고리 슬러그 (영문) */
export const CATEGORY_SLUGS = [
  "study",
  "job",
  "work",
  "date",
  "exercise",
  "travel",
  "hobby",
  "pet",
] as const

export type CategorySlug = (typeof CATEGORY_SLUGS)[number]

/** 슬러그 ↔ 라벨(한글) 매핑 - MOMENT_OPTIONS 순서와 동일 */
const SLUG_TO_LABEL: Record<CategorySlug, string> = {
  study: "공부/시험",
  job: "면접/취준",
  work: "업무/출근",
  date: "약속/데이트",
  exercise: "운동/산책",
  travel: "여행/캠핑",
  hobby: "취미/작업",
  pet: "육아/반려동물",
}

const LABEL_TO_SLUG = Object.fromEntries(
  (Object.entries(SLUG_TO_LABEL) as [CategorySlug, string][]).map(
    ([slug, label]) => [label, slug]
  )
) as Record<string, CategorySlug>

export function slugToLabel(slug: string): string | undefined {
  return SLUG_TO_LABEL[slug as CategorySlug]
}

export function labelToSlug(label: string): string | undefined {
  return LABEL_TO_SLUG[label]
}

/** URL categories 파라미터 파싱 (예: "study,travel,hobby" -> ["study","travel","hobby"]) */
export function parseCategoriesParam(value: string | null): string[] {
  if (!value?.trim()) return []
  return value.split(",").map((s) => s.trim()).filter(Boolean)
}

/** 선택된 슬러그 배열을 URL 쿼리 값으로 (예: ["study","travel"] -> "study,travel") */
export function categoriesToQuery(slugs: string[]): string {
  return slugs.filter(Boolean).join(",")
}
