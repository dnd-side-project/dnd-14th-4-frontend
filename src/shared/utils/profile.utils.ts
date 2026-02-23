export const GENDER_MAP = {
    '남성': 'MALE',
    '여성': 'FEMALE',
} as const;

export const AGE_MAP = {
    '10대': 'AGE_10',
    '20대': 'AGE_20',
    '30대': 'AGE_30',
    '40대': 'AGE_40',
    '50대': 'AGE_50',
    '60대 이상': 'AGE_60',
} as const;

export const AGE_OPTIONS = Object.keys(AGE_MAP);
export const GENDER_OPTIONS = Object.keys(GENDER_MAP);

export const REVERSE_GENDER_MAP: Record<string, string> = Object.fromEntries(
    Object.entries(GENDER_MAP).map(([k, v]) => [v, k])
);

export const REVERSE_AGE_MAP: Record<string, string> = Object.fromEntries(
    Object.entries(AGE_MAP).map(([k, v]) => [v, k])
);