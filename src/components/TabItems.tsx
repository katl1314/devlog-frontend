import { cn } from "@/lib/utils";
import Link from "next/link";
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
  selectedOption?: string;
  onOptionChange?: (opt: string) => void;
}

export default function TabItems({ items, selectedOption }: TabItems) {
  return (
    <>
      {items.map((item) => {
        return (
          <TabItem
            key={item.id}
            {...item}
            isActive={selectedOption === item.id}
          >
            {icons[item.id]}
          </TabItem>
        );
      })}
    </>
  );
}

const icons: { [name: string]: React.ReactNode } = {
  trends: <MdOutlineTrendingUp size={24} />,
  new: <MdOutlineAccessTime size={24} />,
  feed: <MdOutlineRssFeed size={24} />,
};

function TabItem({
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
        "px-4 py-2 flex gap-2 items-center",
        isActive && "bg-violet-300"
      )}
    >
      {children}
      <Link href={href} className="text-lg">
        {text}
      </Link>
    </div>
  );
}
