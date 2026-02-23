"use client";

import * as React from "react";
import { ONBOARDING_STEPS, type OnboardingStep } from "../../model/types";
import { useRouter } from "next/navigation";

interface UseOnboardingFlowProps {
  onProfileSubmit: () => Promise<void>;
  onMomentsSubmit: () => Promise<void>;
  isProfileValid: boolean;
  isMomentsValid: boolean;
}

export function useOnboardingFlow({
  onProfileSubmit,
  onMomentsSubmit,
  isProfileValid,
  isMomentsValid,
}: UseOnboardingFlowProps) {
  const [step, setStep] = React.useState<OnboardingStep>("profile");
  const router = useRouter();

  const progress = React.useMemo(() => {
    const i = ONBOARDING_STEPS.indexOf(step);
    return Math.round(((i + 1) / ONBOARDING_STEPS.length) * 100);
  }, [step]);

  const ctaDisabled =
    step === "profile"
      ? !isProfileValid
      : step === "moments"
        ? !isMomentsValid
        : false;

  const canGoBack = step !== "profile" && step !== "welcome";
  const onBack = () => {
    if (!canGoBack) return;
    setStep((prev) => {
      const i = ONBOARDING_STEPS.indexOf(prev);
      return ONBOARDING_STEPS[Math.max(0, i - 1)];
    });
  };

  const onNext = async () => {
    if (step === "profile") {
      if (!isProfileValid) return;
      await onProfileSubmit();
      setStep("moments");
      return;
    }

    if (step === "moments") {
      if (!isMomentsValid) return;
      await onMomentsSubmit();
      setStep("welcome");
      return;
    }

    router.replace("/");
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
