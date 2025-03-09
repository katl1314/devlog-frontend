import Header from "@/components/Layout/Header/Header";
import style from "./page.module.css";
import PageLayout from "@/components/Layout/PageLayout";
import { FiMoreVertical } from "react-icons/fi";
import TabView from "@/components/TabView";

export default function Layout({ children }: { children: React.ReactNode }) {
  const items: any[] = [
    { id: "trends", text: "트렌딩", href: "/trends/week" },
    { id: "new", text: "최신", href: "/new" },
    { id: "feed", text: "피드", href: "/feed" },
  ];

  return (
    <div className={style.container}>
      <PageLayout>
        <Header />
        <TabView items={items}>
          <FiMoreVertical size={24} />
        </TabView>
        <div className={style.content}>{children}</div>
      </PageLayout>
    </div>
  );
}
