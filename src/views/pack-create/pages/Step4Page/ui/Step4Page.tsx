"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FlowLayout } from "@/shared/ui/layouts/flow-chart";
import { ProgressBar } from "@/views/onboarding/ui/components/ProgressBar";
import { appToast } from "@/shared/utils/toast";
import { usePackCreateItemsStore } from "@/views/pack-create/features/select-pack-items/model/store";
import { useCreatePack } from "@/views/pack-create/entities/pack/model/useCreatePack";
import { mapPackCreateItemToItemDetail } from "@/views/pack-create/shared/model/itemMappers";
import { buildCreatePackRequest } from "../model/buildCreatePackRequest";
import ReviewInputSection from "./components/ReviewInputSection";
import SelectedItemReviewSection from "./components/SelectedItemReviewSection";

export default function Step4Page() {
  const router = useRouter();
  const [reviewText, setReviewText] = useState("");
  const selectedItems = usePackCreateItemsStore((s) => s.selected);
  const resetSelectedItems = usePackCreateItemsStore((s) => s.reset);
  const { createPack, isLoading } = useCreatePack();

  const packName = "신입 디자이너의 우왕좌왕템";
  const category = "업무/출근";
  const userName = "닉네임4조화희";
// TODO: 이전 데이터 가져와서 하드코딩없애기, 저장 .api 연결 필요 
  const itemDetails = useMemo(() => {
    return selectedItems.map((item, index) => mapPackCreateItemToItemDetail(item, index + 1_000_000));
  }, [selectedItems]);

  const canSave = selectedItems.length > 0 && !isLoading;

  const handleSavePack = async () => {
    if (!canSave) return;
    try {
      const request = buildCreatePackRequest({
        title: packName,
        contextCategory: category,
        review: reviewText,
        selectedItems,
      });
      await createPack(request);

      appToast.success("팩이 저장되었어요.");
      resetSelectedItems();
      router.push("/");
    } catch {
      appToast.error("팩 저장에 실패했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <FlowLayout>
      <FlowLayout.Header
        onBack={() => router.back()}
        progressSlot={<ProgressBar value={100} />}
        title={
          <>
            {packName || "새로운 팩"}
            <br />
            <span className="text-pink-500">{category ?? "카테고리 선택 필요"}</span>
          </>
        }
      />

      <FlowLayout.Content className="pt-4">
        <div className="space-y-6">
          <ReviewInputSection
            userName={userName}
            reviewText={reviewText}
            onChange={setReviewText}
          />
          <SelectedItemReviewSection items={itemDetails} />
        </div>
      </FlowLayout.Content>

      <FlowLayout.Footer
        label={isLoading ? "저장 중..." : "저장"}
        disabled={!canSave}
        onClick={handleSavePack}
      />
    </FlowLayout>
  );
}
