import { create } from "zustand";

interface StateType {
  layout: "grid" | "row";
  setLayout: (layout: "grid" | "row") => void;
}

const useLayout = create<StateType>((set) => ({
  layout: "grid",
  setLayout: (layout: "grid" | "row") => set({ layout }),
}));

export default useLayout;
