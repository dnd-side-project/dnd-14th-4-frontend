"use client";

import { ItemBox } from "@/shared/ui/item/ItemBox";
import type { Item } from "@/entities/item/model/types";

interface SelectedItemBoxListProps {
  items: Item[];
}

export default function SelectedItemBoxList({ items }: SelectedItemBoxListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <ItemBox key={item.id} item={item} />
      ))}
    </div>
  );
}
