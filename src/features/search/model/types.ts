export type PackSearchDto = {
  id: number;
  tag: string;
  itemCount: number;
  title: string;
  author: string;
  liked?: boolean;
  description?: string;
  date?: string;
};
