"use client";

import Link from "next/link";
import CustomSelect from "@/components/CustomSelect";
import { useEffect, useState } from "react";

export default function TabView({
  items,
  children,
}: {
  items: any[];
  children?: React.ReactNode;
}) {
  // 특정 조건일때만 Select를 보여줘야한다.
  const options = [
    { label: "오늘", value: "day" },
    { label: "이번 주", value: "week" },
    { label: "이번 달", value: "month" },
    { label: "올해", value: "year" },
  ];

  const [comboValue, setComboValue] = useState<string>("week");

  useEffect(() => {
    console.log("comboValue ::: 변경 후 렌더링", comboValue);
  }, [comboValue]);

  return (
    <div className="flex justify-between">
      <div className="flex">
        {items.map((item) => {
          return <TabItem key={item.id} {...item} />;
        })}
      </div>
      <div className="flex items-center gap-3">
        <CustomSelect
          options={options}
          size={3}
          defaultValue={comboValue}
          onValueChange={setComboValue}
        />
        {children}
      </div>
    </div>
  );
}

function TabItem({
  id,
  text,
  href,
}: {
  id: string;
  text: string;
  href: string;
}) {
  return (
    <div key={id} className="px-4 py-2">
      <Link href={href}>{text}</Link>
    </div>
  );
}
