import Header from "@/components/Layout/Header/Header";
import style from "./page.module.css";
import PageLayout from "@/components/Layout/PageLayout";
import { FiMoreVertical } from "react-icons/fi";
import TabView from "@/components/TabView";
import TabLayout from "@/components/Layout/TabLayout";
import Tabs, { TabItem } from "@/components/Tabs";

export default function Layout({ children }: { children: React.ReactNode }) {
  const items: TabItem[] = [
    { id: "trends", text: "트렌딩", href: "/trends/week" },
    { id: "new", text: "최신", href: "/new" },
    { id: "feed", text: "피드", href: "/feed" },
  ];

  // /trends 일때만 보여줘야함. => 콤보박스 형태로...
  const options = [
    { text: "오늘", id: "day", href: "/trends/day" },
    { text: "이번 주", id: "week", href: "/trends/week" },
    { text: "이번 달", id: "month", href: "/trends/month" },
    { text: "올해", id: "year", href: "/trends/year" },
  ];

  return (
    <div className={style.container}>
      <PageLayout>
        <Header />
        <TabLayout>
          <TabView showOption={true}>
            <Tabs items={items} defaultPath="/trends/week" />
          </TabView>
          <TabView showOption={true} position="end">
            {/* <Tabs items={options} /> */}
            <FiMoreVertical size={20} />
          </TabView>
        </TabLayout>
        <div className={style.content}>{children}</div>
      </PageLayout>
    </div>
  );
}
