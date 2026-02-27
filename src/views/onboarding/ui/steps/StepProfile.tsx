"use client";

import { AGE_OPTIONS, GENDER_OPTIONS } from "../../model/constants";
import { Placeholder } from "@/shared/ui/Placeholder";
import { BtnSelection } from "@/shared/ui/BtnSelection";
import { EditSection } from "@/views/profile-edit/ui/components/EditSection";

interface StepProfileProps {
  name: string;
  setName: (name: string) => void;
  selectedAge: string;
  setSelectedAge: (age: string) => void;
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
}

export function StepProfile({
  name, setName,
  selectedAge, setSelectedAge,
  selectedGender, setSelectedGender
}: StepProfileProps) {

  return (
    <div className="flex flex-col flex-grow gap-10">
      <EditSection label="닉네임">
        <Placeholder value={name} setValue={setName} />
      </EditSection>

      <EditSection label="연령대">
        <div className="flex flex-wrap gap-2">
          {AGE_OPTIONS.map((age) => (
            <BtnSelection key={age} selected={selectedAge === age} onClick={() => setSelectedAge(age)}>
              {age}
            </BtnSelection>
          ))}
        </div>
      </EditSection>

      <EditSection label="성별">
        <div className="flex gap-2">
          {GENDER_OPTIONS.map((gender) => (
            <BtnSelection key={gender} size="sm" selected={selectedGender === gender} onClick={() => setSelectedGender(gender)}>
              {gender}
            </BtnSelection>
          ))}
        </div>
      </EditSection>
    </div>
  );
}