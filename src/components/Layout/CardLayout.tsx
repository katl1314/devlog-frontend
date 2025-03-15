"use client";
import { cn } from "@/lib/utils";
import useLayout from "@/store/layout";

export default function CardLayout({
  children,
}: {
  children: React.ReactNode[];
}) {
  const { layout } = useLayout();
  const gridCss = layout === "grid" && `md:flex-row md:flex-wrap`;
  const colCss = !gridCss && `flex-col`;

  return (
    <div className={cn("flex gap-3 flex-col ", gridCss, colCss)}>
      {children}
    </div>
  );
}
