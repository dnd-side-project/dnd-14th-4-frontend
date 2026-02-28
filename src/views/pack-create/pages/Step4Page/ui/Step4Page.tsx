"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { FlowLayout } from "@/shared/ui/layouts/flow-chart";
import { ProgressBar } from "@/views/onboarding/ui/components/ProgressBar";
import { appToast } from "@/shared/utils/toast";
import { usePackCreateItemsStore } from "@/views/pack-create/features/select-pack-items/model/store";
import { usePackCreateDraftStore } from "@/views/pack-create/features/create-pack/model/store";
import { useCreatePack } from "@/views/pack-create/entities/pack/model/useCreatePack";
import { mapPackCreateItemToItemDetail } from "@/views/pack-create/shared/model/itemMappers";
import { buildCreatePackRequest } from "../model/buildCreatePackRequest";
import ReviewInputSection from "./components/ReviewInputSection";
import SelectedItemReviewSection from "./components/SelectedItemReviewSection";
import { useUserStore } from "@/entities/user/model/useUserStore";

export default function Step4Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useUserStore((s) => s.user);
  const isUserLoaded = useUserStore((s) => s.isLoaded);
  const fetchMyInfo = useUserStore((s) => s.fetchMyInfo);
  const userName = user?.name ?? (isUserLoaded ? "사용자" : "불러오는 중...");
  const profileImageUrl = user?.profileImageUrl;
  const packName = usePackCreateDraftStore((s) => s.packName);
  const category = usePackCreateDraftStore((s) => s.category);
  const reviewText = usePackCreateDraftStore((s) => s.reviewText);
  const setReviewText = usePackCreateDraftStore((s) => s.setReviewText);
  const resetDraft = usePackCreateDraftStore((s) => s.reset);
  const selectedItems = usePackCreateItemsStore((s) => s.selected);
  const resetSelectedItems = usePackCreateItemsStore((s) => s.reset);
  const { createPack, isLoading } = useCreatePack();

  useEffect(() => {
    if (!isUserLoaded) fetchMyInfo();
  }, [fetchMyInfo, isUserLoaded]);

  const itemDetails = useMemo(() => {
    return selectedItems.map((item, index) => mapPackCreateItemToItemDetail(item, index + 1_000_000));
  }, [selectedItems]);

  const canSave =
    selectedItems.length > 0 &&
    !isLoading &&
    packName.trim().length > 0 &&
    category != null;

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
      await queryClient.invalidateQueries({ queryKey: ["my-packs"] });

      appToast.success("팩이 저장되었어요.");
      resetSelectedItems();
      resetDraft();
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
            profileImageUrl={profileImageUrl}
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
