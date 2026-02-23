"use client";

import { usePackCreateItemsStore } from "@/views/pack-create/features/select-pack-items/model/store";
import SwipeToDeleteItemCard from "@/views/pack-create/features/select-pack-items/ui/SwipeToDeleteItemCard";
import AddItemCard from "@/views/pack-create/features/select-pack-items/ui/AddItemCard";
import type { Item } from "@/views/pack-create/entities/item/model/types";

interface SelectedItemsSectionProps {
  onAddClick: () => void;
}

export default function SelectedItemsSection({ onAddClick }: SelectedItemsSectionProps) {
  const selected = usePackCreateItemsStore((s) => s.selected);

  return (
    <div className="space-y-4">
      {selected.map((item: Item) => (
        <SwipeToDeleteItemCard key={item.id} item={item} />
      ))}

      <AddItemCard onClick={onAddClick} />
    </div>
  );
}
