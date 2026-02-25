import type { PackCardData } from "@/shared/ui/item/PackCard";

export type PackSearchDto = {
  id: string;
  tag: string;
  itemCount: number;
  title: string;
  author: string; 
  liked?: boolean;
  description?: string;
  date?: string;
};

export const toPackCardData = (dto: PackSearchDto): PackCardData => ({
  id: dto.id,
  tag: dto.tag,
  itemCount: dto.itemCount,
  title: dto.title,
  author: dto.author,
  liked: dto.liked ?? false,
  description: dto.description,
  date: dto.date,
});