"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type TabItem = {
  id: string;
  text: string;
  href: string;
};

interface TabItems {
  items: TabItem[];
  icons?: { [name: string]: React.ReactNode };
  defaultPath?: string;
  onOptionChange?: (opt: string) => void;
}

export default function Tabs({ items, icons, defaultPath }: TabItems) {
  const pathname = usePathname();
  return (
    <>
      {items.map((item) => {
        const target = pathname === "/" ? defaultPath ?? "" : pathname;
        const isActive = item.href.startsWith(target);
        return (
          <Tab key={item.id} {...item} isActive={isActive}>
            {icons?.[item.id]}
          </Tab>
        );
      })}
    </>
  );
}

function Tab({
  id,
  text,
  href,
  children,
  isActive = false,
}: {
  id: string;
  text: string;
  href: string;
  children?: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <div
      key={id}
      className={cn(
        "px-4 py-2 flex gap-2 items-center relative text-zinc-400",
        isActive &&
          "font-bold text-black before:content-[''] before:absolute before:border-1 before:w-[70%] before:left-[calc((100%-70%)/2)] before:bottom-0"
      )}
    >
      {children}
      <Link href={href} className="text-lg">
        {text}
      </Link>
    </div>
  );
}
