import { cn } from "@/lib/utils";

export default function TabView({
  children,
  showOption = false,
  position = "start",
}: {
  children: React.ReactNode[] | React.ReactNode;
  showOption?: boolean;
  position?: "start" | "end";
}) {
  // 특정 조건일때만 Select를 보여줘야한다.

  const flexPosition: Record<"start" | "end", string> = {
    start: "justify-start",
    end: "justify-end",
  };

  const justifyStart =
    position != "start" && `${flexPosition[position]} flex-auto`;
  return (
    <div className={cn("flex items-center", justifyStart)}>
      {showOption && <>{children}</>}
    </div>
  );
}
