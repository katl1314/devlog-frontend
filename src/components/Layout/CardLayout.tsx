"use client";
import { cn } from "@/lib/utils";
import useLayout from "@/store/layout";

export default function CardLayout({
  children,
}: {
  children: React.ReactNode[];
}) {
  const { layout } = useLayout();
  const styles =
    layout === "grid"
      ? `lg:grid lg:grid-cols-3 2xl:grid-cols-5`
      : `md:flex md:flex-col`;

  return (
    <div className={cn("gap-2", styles, "grid sm:grid-cols-1 md:grid-cols-2")}>
      {children}
    </div>
  );
}
