"use client";

import { useFormContext } from "react-hook-form";
import type { OnboardingFormValues } from "../../model/schema";
import { TextInput } from "./TextInput";
import { cn } from "@/shared/lib/cn";

const NICKNAME_MAX = 10;

export function NicknameField() {
  const {
    register,
    watch,
    formState: { errors, touchedFields, submitCount },
  } = useFormContext<OnboardingFormValues>();

  const nickname = watch("nickname") ?? "";
  const nicknameLen = nickname.length;

  const hasNicknameError = !!errors.nickname;
  const showNicknameError =
    hasNicknameError && (touchedFields.nickname || submitCount > 0);

  return (
    <div>
      <p className="text-sm text-label-subtle mb-2">닉네임</p>

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
  );
}
