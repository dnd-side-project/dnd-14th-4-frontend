"use client";

import { ItemBox } from "@/shared/ui/item/ItemBox";
import type { Item } from "@/entities/item/model/types";

interface SelectedItemReviewSectionProps {
  items: Item[];
}

export default function SelectedItemReviewSection({
  items,
}: SelectedItemReviewSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="type-heading2 text-label-default">
        아이템 <span className="text-pink-500">{items.length}</span>
      </h2>
      {items.map((item) => (
        <ItemBox key={item.id} item={item} />
      ))}
    </section>
  );
}
