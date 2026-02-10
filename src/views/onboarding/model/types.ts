export const ONBOARDING_STEPS = ["profile", "moments", "welcome"] as const;
export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];

export const STEP_META: Record<
  OnboardingStep,
  { title: string; description?: string; ctaLabel: string }
> = {
  profile: {
    title: "정보를 한 번만 입력하면\n다양한 리뷰를 확인할 수 있어요!",
    description: "나중에 언제든 바꿀 수 있으니 가볍게 정해봐요.",
    ctaLabel: "다음",
  },
  moments: {
    title:
      "요즘 어떤 순간에 집중하고 있나요?\n상황별 꿀템 리뷰를 추천해 드릴게요.",
    description: "최대 3개까지 선택할 수 있어요.",
    ctaLabel: "다음",
  },
  welcome: {
    title: "환영해요!",
    ctaLabel: "시작하기",
  },
};
