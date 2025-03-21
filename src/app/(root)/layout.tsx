import Header from "@/components/Layout/Header";
import PageLayout from "@/components/Layout/PageLayout";
import TabView from "@/components/Tab/TabView";
import TabLayout from "@/components/Layout/TabLayout";
import Tabs, { TabItem } from "@/components/Tab/Tabs";
import {
  MdOutlineTrendingUp,
  MdOutlineAccessTime,
  MdOutlineRssFeed,
} from "react-icons/md";
import LayoutControl from "@/components/Layout/LayoutControl";
import QueryProvider from "@/components/QueryProvider";

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
    <QueryProvider>
      <div className="mx-auto">
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
          <div className=" my-[10px] mx-auto px-4">{children}</div>
        </PageLayout>
      </div>
    </QueryProvider>
  );
}
