"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FlowLayout } from "@/shared/ui/layouts/flow-chart";
import { ProgressBar } from "@/views/onboarding/ui/components/ProgressBar";
import SelectedItemsSection from "@/views/pack-create/widgets/SelectedItemsSection/ui/SelectedItemsSection";
import { usePackCreateItemsStore } from "@/views/pack-create/features/select-pack-items/model/store";
import { usePackCreateDraftStore } from "@/views/pack-create/features/create-pack/model/store";
import { ItemAdd } from "@/views/my-pack/ui/components/ItemAdd";
import { FixedBottomButton } from "@/shared/ui/FixedBottomButton";

export default function Step1SelectItemsPage() {
  const router = useRouter();
  const [isAddingItems, setIsAddingItems] = useState(false);
  const selectedItems = usePackCreateItemsStore((s) => s.selected);
  const addSelectedItem = usePackCreateItemsStore((s) => s.add);
  const resetSelectedItems = usePackCreateItemsStore((s) => s.reset);
  const initialSelectedItemIds = useMemo(
    () => selectedItems.map((item) => item.id),
    [selectedItems]
  );

  const canGoNext = selectedItems.length > 0;

  const openItemAdd = () => setIsAddingItems(true);
  const closeItemAdd = () => setIsAddingItems(false);

  const applySelectedItems = (items: typeof selectedItems) => {
    resetSelectedItems();
    items.forEach((item) => addSelectedItem(item));
    closeItemAdd();
  };

  if (isAddingItems) {
    return (
      <ItemAdd
        onBack={closeItemAdd}
        addMode="item"
        initialSelectedItemIds={initialSelectedItemIds}
        onAddItems={applySelectedItems}
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
      <FixedBottomButton
        onClick={() => {
          const { setPackName, setCategory, setReviewText } = usePackCreateDraftStore.getState();
          setPackName("");
          setCategory(null);
          setReviewText("");
          router.push("/pack-create/step-2");
        }}
        disabled={!canGoNext}
      >
        다음
      </FixedBottomButton>
    </FlowLayout>
  );
}
