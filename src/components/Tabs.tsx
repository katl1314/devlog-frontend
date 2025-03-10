"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdOutlineTrendingUp,
  MdOutlineAccessTime,
  MdOutlineRssFeed,
} from "react-icons/md";

export type TabItem = {
  id: string;
  text: string;
  href: string;
};

interface TabItems {
  items: TabItem[];
  defaultPath?: string;
  onOptionChange?: (opt: string) => void;
}

const icons: { [name: string]: React.ReactNode } = {
  trends: <MdOutlineTrendingUp size={24} />,
  new: <MdOutlineAccessTime size={24} />,
  feed: <MdOutlineRssFeed size={24} />,
};

export default function Tabs({ items, defaultPath }: TabItems) {
  const pathname = usePathname();
  return (
    <>
      {items.map((item) => {
        const target = pathname === "/" ? defaultPath ?? "" : pathname;
        const isActive = item.href.startsWith(target);
        return (
          <Tab key={item.id} {...item} isActive={isActive}>
            {icons[item.id]}
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
        "px-4 py-2 flex gap-2 items-center relative",
        isActive &&
          "before:content-[''] before:absolute before:border-1 before:w-full before:left-0 before:top-[40px]"
      )}
    >
      {children}
      <Link href={href} className="text-lg">
        {text}
      </Link>
    </div>
  );
}
