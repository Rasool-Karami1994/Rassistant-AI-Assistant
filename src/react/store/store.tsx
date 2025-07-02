import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Store = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
      }),
      {
        name: "rassistant Store",
      },
    ),
  ),
);

export default useStore;
