"use client";
import { FiMoreVertical } from "react-icons/fi";
import { CiGrid41, CiGrid2H } from "react-icons/ci";
import useLayout from "@/store/layout";

export default function LayoutControl() {
  const { layout, setLayout } = useLayout();

  const changeLayout = (layout: "grid" | "column") => {
    setLayout(layout);
  };
  return (
    <div className="hidden md:flex items-center gap-4">
      <div className="flex gap-2">
        <CiGrid41
          size={26}
          className={"cursor-pointer"}
          fill={layout === "grid" ? "blue" : ""}
          onClick={changeLayout.bind(null, "grid")}
        />
        <CiGrid2H
          size={26}
          className={"cursor-pointer"}
          fill={layout === "column" ? "blue" : ""}
          onClick={changeLayout.bind(null, "column")}
        />
      </div>
      <FiMoreVertical size={22} />
    </div>
  );
}
