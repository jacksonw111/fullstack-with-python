import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useMenuStore = create(
  persist(
    (set, get) => ({
      menus: [],
      fetch: async () => {},
    }),
    {
      name: "menu-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
