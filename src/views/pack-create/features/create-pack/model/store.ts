"use client";

import { create } from "zustand";

type State = {
  packName: string;
  category: string | null;
  reviewText: string;
  setPackName: (name: string) => void;
  setCategory: (category: string | null) => void;
  setReviewText: (text: string) => void;
  reset: () => void;
};

export const usePackCreateDraftStore = create<State>((set) => ({
  packName: "",
  category: null,
  reviewText: "",
  setPackName: (packName) => set({ packName }),
  setCategory: (category) => set({ category }),
  setReviewText: (reviewText) => set({ reviewText }),
  reset: () => set({ packName: "", category: null, reviewText: "" }),
}));
