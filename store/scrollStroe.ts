// stores/scrollStore.ts
import { create } from 'zustand';

interface ScrollStore {
  footerRef: HTMLElement | null;
  setFooterRef: (ref: HTMLElement) => void;
}
interface ChooseUsStore{
  chooseUsRef:HTMLElement | null,
  setChooseUsRef:(ref: HTMLElement) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  footerRef: null,
  setFooterRef: (ref) => set({ footerRef: ref }),
}));

export const useChooseUsStore = create<ChooseUsStore>((set) => ({
  chooseUsRef: null,
  setChooseUsRef: (ref) => set({ chooseUsRef: ref }),
}));