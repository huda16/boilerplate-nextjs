import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface DrawerState {
  open: boolean;
  toggleDrawer: () => void;
  setOpen: (open: boolean) => void;
}

export const useDrawerStore = create<DrawerState>()(
  persist(
    (set) => ({
      open: true,
      toggleDrawer: () => set((state) => ({ open: !state.open })),
      setOpen: (open) => set({ open }),
    }),
    {
      name: "drawer-state",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
