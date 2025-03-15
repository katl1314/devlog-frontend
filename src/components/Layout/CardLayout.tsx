"use client";
import { cn } from "@/lib/utils";
import useLayout from "@/store/layout";

export default function CardLayout({
  children,
}: {
  children: React.ReactNode[];
}) {
  const { layout } = useLayout();
  const gridCss = layout === "grid" && `flex-row flex-wrap gap-3`;
  const rowCss = !gridCss && `flex-col`;

  return <div className={cn("flex", gridCss, rowCss)}>{children}</div>;
}
