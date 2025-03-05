import Header from "@/components/Layout/Header/Header";
import style from "./page.module.css";
import PageLayout from "@/components/Layout/PageLayout";
import Link from "next/link";
import CustomSelect from "@/components/CustomSelect";
import { FiMoreVertical } from "react-icons/fi";

export default function Layout({ children }: { children: React.ReactNode }) {
  const items: any[] = [
    { id: "week", text: "트렌딩" },
    { id: "new", text: "최신" },
    { id: "feed", text: "피드" },
  ];

  // 특정 조건일때만 Select를 보여줘야한다.
  const options = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
  ];
  return (
    <div className={style.container}>
      <PageLayout>
        <Header />
        <TabView items={items}>
          <CustomSelect options={options} />
          <FiMoreVertical size={24} />
        </TabView>
        <div className={style.content}>{children}</div>
      </PageLayout>
    </div>
  );
}

function TabView({
  items,
  children,
}: {
  items: any[];
  children?: React.ReactNode[];
}) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        {items.map((item) => {
          return <TabItem key={item.id} {...item} />;
        })}
      </div>
      <div className="flex items-center gap-3">
        <>{children}</>
      </div>
    </div>
  );
}

function TabItem({ id, text }: { id: string; text: string }) {
  return (
    <div key={id} className="px-4 py-2">
      <Link href={`/${id}`}>{text}</Link>
    </div>
  );
}
