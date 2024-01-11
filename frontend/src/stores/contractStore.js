import { create } from "zustand";

export const useContractStore = create((set) => ({
  contract: null,
  setContract: (contract) => set({ contract }),
}));
