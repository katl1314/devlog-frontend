"use client";
import { FiMoreVertical } from "react-icons/fi";
import { CiGrid41, CiGrid2H } from "react-icons/ci";
import useLayout from "@/store/layout";
import { cn } from "@/lib/utils";

export default function LayoutControl() {
  const { layout, setLayout } = useLayout();
  const activeCss = "bg-neutral-400 rounded-md";

  const changeLayout = (layout: "grid" | "row") => {
    setLayout(layout);
  };
  return (
    <>
      <CiGrid41
        size={26}
        className={cn("cursor-pointer", layout === "grid" && activeCss)}
        color={layout === "grid" ? "white" : ""}
        onClick={changeLayout.bind(null, "grid")}
      />
      <CiGrid2H
        size={26}
        className={cn("cursor-pointer", layout === "row" && activeCss)}
        color={layout === "row" ? "white" : ""}
        onClick={changeLayout.bind(null, "row")}
      />
      <FiMoreVertical size={22} />
    </>
  );
}
