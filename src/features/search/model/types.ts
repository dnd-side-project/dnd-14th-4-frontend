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
