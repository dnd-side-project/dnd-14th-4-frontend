import { create } from "zustand";
import type { Item } from "@/views/pack-create/entities/item/model/types";

type State = {
  selected: Item[];
  add: (item: Item) => void;
  remove: (id: string) => void;
  toggle: (item: Item) => void;
  has: (id: string) => boolean;
  reset: () => void;
};

export const usePackCreateItemsStore = create<State>((set, get) => ({
  selected: [],
  add: (item) =>
    set((s) =>
      s.selected.some((x) => x.id === item.id) ? s : { selected: [...s.selected, item] }
    ),
  remove: (id) => set((s) => ({ selected: s.selected.filter((x) => x.id !== id) })),
  toggle: (item) => {
    const exists = get().selected.some((x) => x.id === item.id);
    set((s) => ({
      selected: exists
        ? s.selected.filter((x) => x.id !== item.id)
        : [...s.selected, item],
    }));
  },
  has: (id) => get().selected.some((x) => x.id === id),
  reset: () => set({ selected: [] }),
}));
