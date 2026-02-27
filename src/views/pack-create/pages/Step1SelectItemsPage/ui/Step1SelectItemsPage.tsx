"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FlowLayout } from "@/shared/ui/layouts/flow-chart";
import { ProgressBar } from "@/views/onboarding/ui/components/ProgressBar";
import SelectedItemsSection from "@/views/pack-create/widgets/SelectedItemsSection/ui/SelectedItemsSection";
import { usePackCreateItemsStore } from "@/views/pack-create/features/select-pack-items/model/store";
import { ItemAdd } from "@/views/my-pack/ui/components/ItemAdd";

export default function Step1SelectItemsPage() {
  const router = useRouter();
  const [isAddingItems, setIsAddingItems] = useState(false);
  const selectedItems = usePackCreateItemsStore((s) => s.selected);

  const canGoNext = selectedItems.length > 0;

  const openItemAdd = () => setIsAddingItems(true);
  const closeItemAdd = () => setIsAddingItems(false);

  if (isAddingItems) {
    return (
      <ItemAdd
        onBack={closeItemAdd}
        addMode="item"
      />
    );
  }

  return (
    <FlowLayout>
      <FlowLayout.Header
        onBack={() => router.back()}
        progressSlot={<ProgressBar value={25} />}
        title={
          <>
            가방 속에 꼭 챙기는
            <br />
            <span className="text-pink-500">나만의 애착템</span>을 선택해
            보세요.
          </>
        }
      />

      <FlowLayout.Content className="pt-6">
        <SelectedItemsSection onAddClick={openItemAdd} />
      </FlowLayout.Content>

      <FlowLayout.Footer
        label="다음"
        disabled={!canGoNext}
        onClick={() => router.push("/pack/create/step-2")}
        className="px-5 pb-6"
      />
    </FlowLayout>
  );
}
