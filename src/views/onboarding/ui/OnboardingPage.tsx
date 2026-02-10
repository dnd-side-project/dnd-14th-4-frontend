"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema, type OnboardingFormValues } from "../model/schema";
import { STEP_META } from "../model/types";
import { StepProfile } from "./steps/StepProfile";
import { useOnboardingFlow } from "./hooks/useOnboardingFlow";
import { StepMoments } from "./steps/StepMoment";
import { StepWelcome } from "./steps/StepWelcome";
import { FlowLayout } from "@/shared/ui/layouts/flow-chart";
import { ProgressBar } from "./components/ProgressBar";

export function OnboardingPage() {
  const methods = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    mode: "onChange",
    defaultValues: {
      nickname: "",
      ageRange: undefined,
      gender: undefined,
      moments: [],
    },
  });

  const { step, progress, ctaDisabled, onBack, onNext } =
    useOnboardingFlow(methods);

  const meta = STEP_META[step];

  return (
    <FormProvider {...methods}>
      <FlowLayout>
        <FlowLayout.Header
          onBack={step === "welcome" ? undefined : onBack}
          progressSlot={<ProgressBar value={progress} />}
          title={<span style={{ whiteSpace: "pre-line" }}>{meta.title}</span>}
          description={meta.description}
        />

        <FlowLayout.Content hasFooter>
          {step === "profile" && <StepProfile />}
          {step === "moments" && <StepMoments />}
          {step === "welcome" && <StepWelcome />}
        </FlowLayout.Content>

        <FlowLayout.Footer
          label={meta.ctaLabel}
          disabled={ctaDisabled}
          onClick={onNext}
          maxWidthMobile
        />
      </FlowLayout>
    </FormProvider>
  );
}
