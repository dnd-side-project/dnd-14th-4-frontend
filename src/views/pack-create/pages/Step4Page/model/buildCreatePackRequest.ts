import type { Item } from "@/views/pack-create/entities/item/model/types";
import type { CreatePackRequestDTO } from "@/views/pack-create/entities/pack/model/useCreatePack";

interface BuildCreatePackRequestParams {
  title: string;
  contextCategory: string;
  review: string;
  selectedItems: Item[];
}

export function buildCreatePackRequest({
  title,
  contextCategory,
  review,
  selectedItems,
}: BuildCreatePackRequestParams): CreatePackRequestDTO {
  return {
    title,
    contextCategory,
    review: review.trim(),
    items: selectedItems
      .map((item) => Number(item.id))
      .filter((id) => !Number.isNaN(id)),
  };
}
