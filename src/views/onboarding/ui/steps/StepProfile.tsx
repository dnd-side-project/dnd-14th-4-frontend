"use client";

import { useFormContext } from "react-hook-form";
import type { OnboardingFormValues } from "../../model/schema";
import { AGE_OPTIONS, GENDER_OPTIONS } from "../../model/constants";
import { ChipButton } from "../components/ChipButton";
import { TextInput } from "../components/TextInput";
import { cn } from "@/shared/lib/cn";

const NICKNAME_MAX = 10;

export function StepProfile() {
  const {
    register,
    setValue,
    watch,
    formState: { errors, touchedFields, submitCount },
  } = useFormContext<OnboardingFormValues>();

  const nickname = watch("nickname") ?? "";
  const nicknameLen = nickname.length;

  const hasNicknameError = !!errors.nickname;
  const showNicknameError =
    hasNicknameError && (touchedFields.nickname || submitCount > 0);

  const ageRange = watch("ageRange");
  const gender = watch("gender");

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-sm text-neutral-400 mb-2">닉네임</p>

        <TextInput
          maxLength={NICKNAME_MAX}
          {...register("nickname")}
          isError={showNicknameError}
          footerLeft={
            showNicknameError
              ? (errors.nickname?.message as string)
              : "*특수기호, 띄어쓰기, 영문 대문자 사용 불가"
          }
          footerRight={
            <span className="flex items-center gap-0.5">
              <span className={cn(showNicknameError && "text-red-500")}>
                {nicknameLen}
              </span>
              <span>/</span>
              <span>{NICKNAME_MAX}자</span>
            </span>
          }
        />
      </div>

      <div>
        <p className="text-sm text-neutral-400 mb-3">연령대</p>
        <div className="flex flex-wrap gap-2">
          {AGE_OPTIONS.map((v) => (
            <ChipButton
              key={v}
              selected={ageRange === v}
              onClick={() => setValue("ageRange", v, { shouldValidate: true })}
            >
              {v}
            </ChipButton>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm text-neutral-400 mb-3">성별</p>
        <div className="flex gap-2">
          {GENDER_OPTIONS.map((v) => (
            <ChipButton
              key={v}
              selected={gender === v}
              onClick={() => setValue("gender", v, { shouldValidate: true })}
            >
              {v}
            </ChipButton>
          ))}
        </div>
      </div>
    </div>
  );
}
