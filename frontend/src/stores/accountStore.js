import { create } from "zustand";

export const useAccountStore = create((set) => ({
  accounts: [],
  setAccounts: (accounts) => set({ accounts }),
}));
