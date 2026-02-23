export const MOMENT_MAP: Record<string, number> = {
    '공부/시험': 1,
    '면접/취준': 2,
    '업무/출근': 3,
    '약속/데이트': 4,
    '운동/산책': 5,
    '여행/캠핑': 6,
    '취미/작업': 7,
    '육아/반려동물': 8,
};

export const MOMENT_OPTIONS = Object.keys(MOMENT_MAP);

export const REVERSE_MOMENT_MAP: Record<number, string> = Object.fromEntries(
    Object.entries(MOMENT_MAP).map(([k, v]) => [v, k])
);