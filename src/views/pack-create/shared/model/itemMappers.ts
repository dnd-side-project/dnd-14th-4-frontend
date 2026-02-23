"use client";

import type { Item as ApiItem } from "@/entities/item/model/types";
import type { Item as ItemDetail } from "@/entities/item/model/types";
import type { Item as PackCreateItem } from "@/views/pack-create/entities/item/model/types";

type ItemCardSatisfactionLabel = "좋아요" | "매우좋아요" | "인생템";
type ItemCardUsePeriodLabel = "1년이하" | "1년이상" | "3년이상" | "5년이상";

const API_TO_PACK_CREATE_SATISFACTION: Record<string, string> = {
  GOOD: "👍 좋아요",
  VERY_GOOD: "매우좋아요",
  MUST_HAVE: "인생템",
};

const API_TO_PACK_CREATE_USE_PERIOD: Record<string, string> = {
  BELOW_ONE_YEAR: "1년 이하",
  ABOVE_ONE_YEAR: "1년 이상",
  ABOVE_THREE_YEAR: "3년 이상",
  ABOVE_FIVE_YEAR: "5년 이상",
};

export const DEFAULT_ITEM_PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100%25' height='100%25' fill='%239A9A9A'/%3E%3C/svg%3E";

export function mapApiItemToPackCreateItem(item: ApiItem): PackCreateItem {
  return {
    id: String(item.id),
    name: item.productName,
    brand: item.brandName,
    likeLabel: item.satisfaction
      ? API_TO_PACK_CREATE_SATISFACTION[item.satisfaction] ?? "👍 좋아요"
      : undefined,
    durationLabel: item.usePeriod
      ? API_TO_PACK_CREATE_USE_PERIOD[item.usePeriod] ?? "1년 이상"
      : undefined,
    kind: "ITEM",
  };
}

export function mapPackCreateLikeLabelToCardSatisfaction(
  likeLabel?: string
): ItemCardSatisfactionLabel {
  if (likeLabel?.includes("매우")) return "매우좋아요";
  if (likeLabel?.includes("인생")) return "인생템";
  return "좋아요";
}

export function mapPackCreateDurationLabelToCardUsePeriod(
  durationLabel?: string
): ItemCardUsePeriodLabel {
  if (durationLabel?.includes("5")) return "5년이상";
  if (durationLabel?.includes("3")) return "3년이상";
  if (durationLabel?.includes("이하")) return "1년이하";
  return "1년이상";
}

export function mapPackCreateItemToItemCardProps(
  item: PackCreateItem,
  fallbackId = 0
) {
  return {
    id: Number(item.id) || fallbackId,
    productName: item.name,
    brandName: item.brand ?? "",
    satisfaction: mapPackCreateLikeLabelToCardSatisfaction(item.likeLabel),
    usePeriod: mapPackCreateDurationLabelToCardUsePeriod(item.durationLabel),
  };
}

export function mapPackCreateItemToItemDetail(
  item: PackCreateItem,
  fallbackId: number
): ItemDetail {
  return {
    id: Number(item.id) || fallbackId,
    brandName: item.brand ?? "브랜드명",
    productName: item.name,
    satisfaction: mapPackCreateLikeLabelToCardSatisfaction(item.likeLabel),
    review: "",
    reviewImagePaths: [
      DEFAULT_ITEM_PLACEHOLDER_IMAGE,
      DEFAULT_ITEM_PLACEHOLDER_IMAGE,
      DEFAULT_ITEM_PLACEHOLDER_IMAGE,
    ],
    usePeriod: mapPackCreateDurationLabelToCardUsePeriod(item.durationLabel),
    purchaseLocation: "구매처 미입력",
    tags: ["#카테고리", "#추천", "#애착템"],
  };
}
