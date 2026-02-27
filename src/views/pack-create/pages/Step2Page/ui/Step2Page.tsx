"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { FlowLayout } from "@/shared/ui/layouts/flow-chart";
import { ProgressBar } from "@/views/onboarding/ui/components/ProgressBar";
import { usePackCreateItemsStore } from "@/views/pack-create/features/select-pack-items/model/store";
import { usePackCreateDraftStore } from "@/views/pack-create/features/create-pack/model/store";
import type { Item as ItemDetail } from "@/entities/item/model/types";
import { mapPackCreateItemToItemDetail } from "@/views/pack-create/shared/model/itemMappers";
import PackNameInputSection from "./components/PackNameInputSection";
import SelectedItemBoxList from "./components/SelectedItemBoxList";

export default function Step2Page() {
  const router = useRouter();
  const packName = usePackCreateDraftStore((s) => s.packName);
  const setPackName = usePackCreateDraftStore((s) => s.setPackName);
  const selected = usePackCreateItemsStore((s) => s.selected);
  const itemDetails = useMemo<ItemDetail[]>(
    () => selected.map((item, index) => mapPackCreateItemToItemDetail(item, index + 1_000_000)),
    [selected]
  );
  const canNext = packName.trim().length > 0;

  return (
    <FlowLayout>
      <FlowLayout.Header
        onBack={() => router.back()}
        progressSlot={<ProgressBar value={50} />}
        title={
          <>
            어떤 상황에서 쓰는 팩인지
            <br />
            <span className="text-pink-500">이름</span>을 지어주세요!
          </>
        }
      />

      <FlowLayout.Content className="pt-6">
        <div className="space-y-6">
          <PackNameInputSection packName={packName} onChange={setPackName} />
          <SelectedItemBoxList items={itemDetails} />
        </div>
      </FlowLayout.Content>

      <FlowLayout.Footer
        label="다음"
        disabled={!canNext}
        onClick={() => router.push("/pack/create/step-3")}
      />
    </FlowLayout>
  );
}
