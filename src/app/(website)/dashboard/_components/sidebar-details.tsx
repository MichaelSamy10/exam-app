"use client";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { GraduationCap, UserRound } from "lucide-react";
import Link from "next/link";

export default function SidebarDetails() {
  const { activeItem, setActiveItem } = useSidebar();

  const items = [
    { icon: <GraduationCap />, title: "Diplomas", url: "/dashboard" },
    {
      icon: <UserRound />,
      title: "Account Settings",
      url: "/dashboard/account/profile",
    },
  ];

  return (
    <SidebarContent className="w-72 mt-14 ms-10">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  variant={"default"}
                  className={`p-4 h-14 ${
                    activeItem === item.title
                      ? "bg-blue-100 border border-blue-500 text-primary hover:text-primary"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setActiveItem(item.title)}
                >
                  <Link href={item.url} className="flex items-center">
                    <span className="w-6 h-6 font-normal">{item.icon}</span>
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
