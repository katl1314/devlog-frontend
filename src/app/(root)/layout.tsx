import Header from "@/components/Layout/Header/Header";
import style from "./page.module.css";
import PageLayout from "@/components/Layout/PageLayout";
import TabView from "@/components/TabView";
import TabLayout from "@/components/Layout/TabLayout";
import Tabs, { TabItem } from "@/components/Tabs";
import {
  MdOutlineTrendingUp,
  MdOutlineAccessTime,
  MdOutlineRssFeed,
} from "react-icons/md";
import LayoutControl from "@/components/Layout/LayoutControl";

export default function Layout({ children }: { children: React.ReactNode }) {
  const items: TabItem[] = [
    { id: "trends", text: "트렌딩", href: "/trends" },
    { id: "new", text: "최신", href: "/new" },
    { id: "feed", text: "구독", href: "/feed" },
  ];

  const icons: { [name: string]: React.ReactNode } = {
    trends: <MdOutlineTrendingUp size={24} />,
    new: <MdOutlineAccessTime size={24} />,
    feed: <MdOutlineRssFeed size={24} />,
  };

  return (
    <div className={style.container}>
      <PageLayout>
        <Header />
        <TabLayout>
          <TabView showOption={true}>
            <Tabs items={items} icons={icons} defaultPath="/trends" />
          </TabView>
          <TabView showOption={true} position="end" gap={2}>
            <LayoutControl />
          </TabView>
        </TabLayout>
        <div className={style.content}>{children}</div>
      </PageLayout>
    </div>
  );
}
