const satisfactionMap: Record<string, string> = {
    GOOD: "👍좋아요",
    VERY_GOOD: "♥️매우좋아요",
    MUST_HAVE: "🏆인생템",
};

const usePeriodMap: Record<string, string> = {
    BELOW_ONE_YEAR: "1년 이하",
    ABOVE_ONE_YEAR: "1년 이상",
    ABOVE_THREE_YEAR: "3년 이상",
    ABOVE_FIVE_YEAR: "5년 이상",
};


export const SATISFACTION_TO_SERVER: Record<string, string> = {
    "👍좋아요": "GOOD",
    "♥️매우좋아요": "VERY_GOOD",
    "🏆인생템": "MUST_HAVE",
};

export const PERIOD_TO_SERVER: Record<string, string> = {
    "1년 이하": "BELOW_ONE_YEAR",
    "1년 이상": "ABOVE_ONE_YEAR",
    "3년 이상": "ABOVE_THREE_YEAR",
    "5년 이상": "ABOVE_FIVE_YEAR",
};

export function buildDisplayTags(
    satisfaction?: string,
    usagePeriod?: string
): { label: string; variant: "black" | "beige60" }[] {
    const tags: { label: string; variant: "black" | "beige60" }[] = [];

    if (satisfaction) {
        const koreanSatisfaction = satisfactionMap[satisfaction] || satisfaction;
        tags.push({ label: koreanSatisfaction, variant: "black" });
    }

    if (usagePeriod) {
        const koreanPeriod = usePeriodMap[usagePeriod] || usagePeriod;
        tags.push({ label: koreanPeriod, variant: "beige60" });
    }

    return tags;
}