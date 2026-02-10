"use client";

import * as React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { OnboardingFormValues } from "../../model/schema";
import { ONBOARDING_STEPS, type OnboardingStep } from "../../model/types";

export function useOnboardingFlow(
  methods: UseFormReturn<OnboardingFormValues>,
) {
  const [step, setStep] = React.useState<OnboardingStep>("profile");

  const {
    watch,
    trigger,
    getValues,
    formState: { isValid },
  } = methods;

  const values = watch();

  const progress = React.useMemo(() => {
    const i = ONBOARDING_STEPS.indexOf(step);
    return Math.round(((i + 1) / ONBOARDING_STEPS.length) * 100);
  }, [step]);

  const canNextProfile = isValid && !!values.ageRange && !!values.gender;
  const canNextMoments = values.moments.length > 0;

  const ctaDisabled =
    step === "profile"
      ? !canNextProfile
      : step === "moments"
        ? !canNextMoments
        : false;

  const canGoBack = step !== "profile";
  const onBack = () => {
    if (!canGoBack) return;
    setStep((prev) => {
      const i = ONBOARDING_STEPS.indexOf(prev);
      return ONBOARDING_STEPS[Math.max(0, i - 1)];
    });
  };

  const onNext = async () => {
    if (step === "profile") {
      const ok = await trigger(["nickname"]);
      if (!ok || !canNextProfile) return;
      setStep("moments");
      return;
    }

    if (step === "moments") {
      if (!canNextMoments) return;
      setStep("welcome");
      return;
    }

    const payload = getValues();
    //TODO: 제출 api 연결 필요
    console.log("submit onboarding:", payload);
  };

  return {
    step,
    progress,
    ctaDisabled,
    canGoBack,
    onBack,
    onNext,
  };
}
