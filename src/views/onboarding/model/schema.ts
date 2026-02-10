import { z } from "zod";
import { AGE_OPTIONS, GENDER_OPTIONS, MOMENT_OPTIONS } from "./constants";

export const onboardingSchema = z.object({
  nickname: z
    .string()
    .min(1, "닉네임을 입력해주세요.")
    .max(10, "닉네임은 10자 이내로 입력해주세요.")
    .regex(
      /^[a-z0-9가-힣ㄱ-ㅎ]+$/,
      "*특수기호, 띄어쓰기, 영문 대문자 사용 불가",
    ),

  ageRange: z.enum(AGE_OPTIONS).optional(),
  gender: z.enum(GENDER_OPTIONS).optional(),
  moments: z.array(z.enum(MOMENT_OPTIONS)),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
