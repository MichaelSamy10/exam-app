"use client";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { CircleUserRound, Lock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SidebarDetails() {
  const [activeItem, setActiveItem] = useState("");

  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("profile")) {
      setActiveItem("Profile");
    } else {
      setActiveItem("Change password");
    }
  }, [pathname]);

  const items = [
    {
      icon: <CircleUserRound />,
      title: "Profile",
      url: "/dashboard/account/profile",
    },
    {
      icon: <Lock />,
      title: "Change password",
      url: "/dashboard/account/change-password",
    },
  ];

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  variant={"default"}
                  className={`p-4 md:h-11 h-14  ${
                    activeItem === item.title
                      ? "bg-blue-50 text-primary hover:text-primary"
                      : "text-gray-500 hover:bg-muted"
                  }`}
                  onClick={() => setActiveItem(item.title)}
                >
                  <Link href={item.url} className="flex items-center">
                    <span className="w-6 h-6 font-normal">{item.icon}</span>
                    <span
                      className="capitalize whitespace-pre break-words"
                      style={{
                        overflow: "auto",
                        textWrap: "wrap",
                      }}
                    >
                      {item.title}
                    </span>
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
