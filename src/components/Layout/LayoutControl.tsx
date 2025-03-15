"use client";
import { FiMoreVertical } from "react-icons/fi";
import { CiGrid41, CiGrid2H } from "react-icons/ci";
import useLayout from "@/store/layout";
import { cn } from "@/lib/utils";

export default function LayoutControl() {
  const { layout, setLayout } = useLayout();
  const activeCss = "bg-neutral-400 rounded-md";

  const changeLayout = (layout: "grid" | "column") => {
    setLayout(layout);
  };
  return (
    <div className="hidden md:flex items-center gap-2">
      <div className="flex gap-1">
        <CiGrid41
          size={26}
          className={cn("cursor-pointer", layout === "grid" && activeCss)}
          color={layout === "grid" ? "white" : ""}
          onClick={changeLayout.bind(null, "grid")}
        />
        <CiGrid2H
          size={26}
          className={cn("cursor-pointer", layout === "column" && activeCss)}
          color={layout === "column" ? "white" : ""}
          onClick={changeLayout.bind(null, "column")}
        />
      </div>
      <div></div>

      <FiMoreVertical size={22} />
    </div>
  );
}
