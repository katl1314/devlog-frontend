"use client";
import style from "./SidebarLayout.module.css";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import { usePathname } from "next/navigation";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "/test1",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "/test2",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "/test3",
      icon: Search,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ];
  return (
    <div className={style.container}>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>1Depth 예시</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.url === pathname ? (
                      <ActiveMenuButton {...item} />
                    ) : (
                      <UnActiveMenuButton {...item} />
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {/* <Collapsible>
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  2Depth 예시
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible> */}
        </SidebarContent>
      </Sidebar>
      <main className={style.content}>{children}</main>
    </div>
  );
}

function ActiveMenuButton(item: any) {
  return (
    <SidebarMenuButton asChild isActive>
      <a href={item.url}>
        <item.icon />
        <span>{item.title}</span>
      </a>
    </SidebarMenuButton>
  );
}

function UnActiveMenuButton(item: any) {
  return (
    <SidebarMenuButton asChild>
      <a href={item.url}>
        <item.icon />
        <span>{item.title}</span>
      </a>
    </SidebarMenuButton>
  );
}
