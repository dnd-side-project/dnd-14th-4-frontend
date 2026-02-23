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

  return (
    <FlowLayout>
      <FlowLayout.Header
        onBack={step === "welcome" ? undefined : onBack}
        progressSlot={<ProgressBar value={progress} />}
        title={meta.title}
        description={meta.description}
      />

      <FlowLayout.Content hasFooter>
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
        {step === "welcome" && <StepWelcome nickname={profileEdit.name} />}
      </FlowLayout.Content>

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
    </FlowLayout>
  );
}
