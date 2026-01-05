import { create } from "zustand";

interface StateType {
  layout: "grid" | "column";
  setLayout: (layout: "grid" | "column") => void;
}

const useLayout = create<StateType>((set) => ({
  layout: "grid",
  setLayout: (layout: "grid" | "column") => set({ layout }),
}));

export default useLayout;
