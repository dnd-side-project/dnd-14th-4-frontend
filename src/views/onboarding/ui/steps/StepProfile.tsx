"use client";

import { AGE_OPTIONS, GENDER_OPTIONS } from "../../model/constants";
import { NicknameField } from "../components/NicknameField";
import { SingleSelectField } from "../components/SingleSelectField";

export function StepProfile() {
  return (
    <div className="flex flex-col gap-10">
      <NicknameField />

      <SingleSelectField label="연령대" name="ageRange" options={AGE_OPTIONS} />

      <SingleSelectField label="성별" name="gender" options={GENDER_OPTIONS} />
    </div>
  );
}
