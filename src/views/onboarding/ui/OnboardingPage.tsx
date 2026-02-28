"use client";

import { useState } from "react";
import { User } from "@/entities/user/model";
import { STEP_META } from "../model/types";
import { StepProfile } from "./steps/StepProfile";
import { useOnboardingFlow } from "./hooks/useOnboardingFlow";
import { StepMoments } from "./steps/StepMoment";
import { StepWelcome } from "./steps/StepWelcome";
import { FlowLayout } from "@/shared/ui/layouts/flow-chart";
import { ProgressBar } from "./components/ProgressBar";
import { useProfileEdit } from "@/features/profile-edit/model/useProfileEdit";
import { useUpdateInterest } from "@/entities/user/model/useUpdateInterest";
import { useUserStore } from "@/entities/user/model/useUserStore";

const EMPTY_USER: User = {
  name: "",
  profileImageUrl: "",
  contextCategoryNames: [],
  age: "",
  gender: "",
};

export function OnboardingPage() {
  const profileEdit = useProfileEdit(EMPTY_USER, {
    onSuccess: () => { }, // OnboardingPage handles step transition
  });
  const { updateInterest } = useUpdateInterest();
  const { fetchMyInfo } = useUserStore();
  const [moments, setMoments] = useState<string[]>([]);

  const isProfileValid = !!profileEdit.name && !!profileEdit.selectedAge && !!profileEdit.selectedGender;
  const isMomentsValid = moments.length > 0;

  const { step, progress, ctaDisabled, onBack, onNext } = useOnboardingFlow({
    onProfileSubmit: profileEdit.handleSubmit,
    onMomentsSubmit: async () => {
      await updateInterest(moments);
      await fetchMyInfo();
    },
    isProfileValid,
    isMomentsValid,
  });

  const meta = STEP_META[step];
  const isWelcome = step === "welcome";

  return (
    <FlowLayout
      className={
        isWelcome
          ? "h-dvh overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('/background/bg-splash.png')]"
          : undefined
      }
    >
      <FlowLayout.Header
        onBack={step === "welcome" ? undefined : onBack}
        progressSlot={isWelcome ? undefined : <ProgressBar value={progress} />}
        title={meta.title}
        description={meta.description}
      />

      <FlowLayout.Content
        hasFooter={!isWelcome}
        className={
          isWelcome
            ? "!px-0 !pt-0 !pb-0 flex flex-col overflow-hidden"
            : undefined
        }
      >
        {step === "profile" && (
          <StepProfile
            name={profileEdit.name}
            setName={profileEdit.setName}
            selectedAge={profileEdit.selectedAge}
            setSelectedAge={profileEdit.setSelectedAge}
            selectedGender={profileEdit.selectedGender}
            setSelectedGender={profileEdit.setSelectedGender}
          />
        )}
        {step === "moments" && (
          <StepMoments selected={moments} onChange={setMoments} />
        )}
        {step === "welcome" && (
          <div className="flex-1 min-h-0 flex flex-col px-5 pt-8 pb-[calc(20px+env(safe-area-inset-bottom))] overflow-hidden">
            <div className="flex-1 min-h-0">
              <StepWelcome nickname={profileEdit.name} />
            </div>
            <button
              type="button"
              disabled={ctaDisabled}
              onClick={onNext}
              className={
                "h-12 w-full rounded-xl type-label1 " +
                (ctaDisabled
                  ? "bg-neutral-95 text-label-subtle"
                  : "bg-black text-secondary-beige")
              }
            >
              {meta.ctaLabel}
            </button>
          </div>
        )}
      </FlowLayout.Content>

      {!isWelcome && (
        <FlowLayout.Footer
          label={meta.ctaLabel}
          disabled={ctaDisabled}
          onClick={onNext}
          aboveSlot={
            step === "profile"
              ? "개인정보 수집 및 이용에 동의하시면\n아래 버튼을 눌러주세요."
              : undefined
          }
        />
      )}
    </FlowLayout>
  );
}
