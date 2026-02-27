"use client";

import * as React from "react";
import { cn } from "@/shared/lib/cn";
import type { Item } from "@/views/pack-create/entities/item/model/types";
import { ItemCard } from "@/shared/ui/item/ItemCard";
import { usePackCreateItemsStore } from "../model/store";
import { mapPackCreateItemToItemCardProps } from "@/views/pack-create/shared/model/itemMappers";

const MAX = 84;
const THRESHOLD = 48;

export default function SwipeToDeleteItemCard({ item }: { item: Item }) {
  const remove = usePackCreateItemsStore((s) => s.remove);

  const [dx, setDx] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const startXRef = React.useRef<number | null>(null);
  const openedRef = React.useRef(false);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startXRef.current = e.clientX;
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || startXRef.current == null) return;
    const delta = e.clientX - startXRef.current;

    const next = Math.max(
      -MAX,
      Math.min(0, openedRef.current ? -MAX + delta : delta)
    );
    setDx(next);
  };

  const endDrag = () => {
    setIsDragging(false);

    const shouldDelete = dx <= -THRESHOLD;
    if (shouldDelete) {
      remove(item.id);
      setDx(0);
      openedRef.current = false;
      startXRef.current = null;
      return;
    }

    const shouldOpen = false;
    openedRef.current = shouldOpen;

    setDx(shouldOpen ? -MAX : 0);
    startXRef.current = null;
  };

  const cardProps = mapPackCreateItemToItemCardProps(item);

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="absolute inset-y-0 right-0 w-[84px] grid place-items-center bg-transparent">
        <button
          type="button"
          aria-label="delete"
          onClick={() => remove(item.id)}
          className="grid h-10 w-10 place-items-center text-neutral-300"
        >
          🗑️
        </button>
      </div>

      <div
        role="button"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn(
          "rounded-2xl overflow-hidden",
          "touch-pan-y select-none"
        )}
        style={{
          transform: `translateX(${dx}px)`,
          transition: isDragging ? "none" : "transform 180ms ease",
        }}
      >
        <ItemCard
          {...cardProps}
        />
      </div>
    </div>
  );
}
