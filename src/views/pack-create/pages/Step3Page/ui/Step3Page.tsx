"use client";

import { useRouter } from "next/navigation";
import { FlowLayout } from "@/shared/ui/layouts/flow-chart";
import { ProgressBar } from "@/views/onboarding/ui/components/ProgressBar";
import { MultiSelectGroup } from "@/shared/ui/MultiSelectGroup";
import { MOMENT_OPTIONS } from "@/views/onboarding/model/constants";
import { usePackCreateDraftStore } from "@/views/pack-create/features/create-pack/model/store";

export default function Step3Page() {
  const router = useRouter();
  const category = usePackCreateDraftStore((s) => s.category);
  const setCategory = usePackCreateDraftStore((s) => s.setCategory);
  const selectedCategory = category ? [category] : [];

  return (
    <FlowLayout>
      <FlowLayout.Header
        onBack={() => router.back()}
        progressSlot={<ProgressBar value={75} />}
        title={
          <>
            이 팩과 가장 잘 어울리는
            <br />
            <span className="text-pink-500">카테고리</span>를 골라주세요!
          </>
        }
      />

      <FlowLayout.Content className="pt-6">
        <div className="space-y-6">
          <p className="type-body2 text-label-default">
            딱 맞는 카테고리를 선택하면 더 많은 분들이 구경할 수 있어요.
          </p>
          <MultiSelectGroup
            options={MOMENT_OPTIONS}
            selected={selectedCategory}
            onChange={(newSelected) => setCategory(newSelected[0] ?? null)}
            maxCount={1}
          />
        </div>
      </FlowLayout.Content>

      <FlowLayout.Footer
        label="다음"
        disabled={selectedCategory.length === 0}
        onClick={() => router.push("/pack-create/step-4")}
      />
    </FlowLayout>
  );
}
